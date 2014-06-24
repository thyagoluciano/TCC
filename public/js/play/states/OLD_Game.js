(function(){

    GameCtrl.Game = function(){
        this.socket;
        this.init = false;
        this.mapa;
        this.localPlayer;
        this.remotePlayer = [];
        this.camera;

        this.ataque = true;

        this.enemies = [];

        this.itens = [];

        // Variaveis temporarias ( Dados do Banco de Dados);
        this.avatar = {
            name: 'thyago.luciano',
            gender: 'M',
            sprite: {
                atlas: '',
                imagem: ''
            },
            attributes: {
                str: 10,
                agi: 5,
                vit: 99,
                int: 10,
                dex: 23,
                luk: 90,
                level: 99
            },
            position: {
                x: 450,
                y: 80
            },
            storage: {
                items: [
                    {
                        id: 1,
                        type: 'equip',
                        name: 'uva',
                        hp: 100
                    },
                    {
                        id: 1,
                        type: 'restauraçao',
                        name: 'uva',
                        hp: 100
                    }
                ]
            },
            equipment: {
                weapon: {
                    type: 'dagger',
                    atk: 5,
                    hp: 1
                },
                torso: {
                    atk: 0,
                    hp: 1
                },
                legs: {
                    atk: 0,
                    hp: 1
                },
                head: {
                    atk: 0,
                    hp: 1
                },
                hands: {
                    atk: 0,
                    hp: 1
                },
                feet: {
                    atk: 0,
                    hp: 1
                },
                belt: {
                    atk: 0,
                    hp: 1
                }
            }
        };

        this.enemyAvatar = {
            name: 'Skelleton',
            gender: 'M',
            sprite: {
                atlas: '',
                imagem: ''
            },
            attributes: {
                str: 12,
                agi: 2,
                vit: 6,
                int: 10,
                dex: 40,
                luk: 90,
                level: 20
            },
            position: {
                x: 300,
                y: 200
            },
            storage: {

            },
            equipment: {
                weapon: {
                    atk: 0,
                    hp: 1
                },
                torso: {
                    atk: 0,
                    hp: 1
                },
                legs: {
                    atk: 0,
                    hp: 1
                },
                head: {
                    atk: 0,
                    hp: 1
                },
                hands: {
                    atk: 0,
                    hp: 1
                },
                feet: {
                    atk: 0,
                    hp: 1
                },
                belt: {
                    atk: 0,
                    hp: 1
                }
            }
        };
};

    GameCtrl.Game.prototype = {

        create: function(){
            // Inicia o sistema de Fisica do Jogo;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.socket = new Connect(this);
            // Connecta no servidor de socket.
            this.socket.connect();
        },

        _create: function(){
            //Cria o Mapa
            this.mapa = new Mapa(this.game);
            this.mapa.create();

            // Cria o Player Local
            var createPlayer = this.socket.getSocket('Player');
                createPlayer.createPlayer();
        },

        _createEnemy: function(enemy){
            var tmpEnemy = new Enemy(this.game, enemy, this.socket);
                tmpEnemy.create();

            this.enemies.push(tmpEnemy);
        },

        _changeEnemyHP: function(data){

            var tmpEnemy = this.playerById(data.id, this.enemies);

            if(!tmpEnemy){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            tmpEnemy.changeHP(data.value, false);
        },

        _stopEnemy: function( data ){

            var tmpEnemy = this.playerById(data.id, this.enemies);

            if(!tmpEnemy){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            tmpEnemy.stop(false);
        },

        _deathEnemy: function(id){
            var tmpEnemy = this.playerById(id, this.enemies);

            if(!tmpEnemy){
                util.log('Move Player not found: ' + id);
                return;
            };

            this.enemies.splice(this.enemies.indexOf(tmpEnemy), 1);

            tmpEnemy.death(false);
        },

        _createPlayer: function(user){
            this.localPlayer = new Player(this.game, user, this.socket);
            this.localPlayer.create();

            // Cria a Camera
            this.camera = new Camera(this.game, this.localPlayer.player);
            this.camera.create();

            this.init = true;
        },

        _onRemotePlayer: function( user ){
            var remotePlayer = new Player(this.game, user, this.socket);
                remotePlayer.create();

            this.remotePlayer.push(remotePlayer);
        },

        _onMovePlayer: function( data ){
            var newRemotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.setDirection(data.direction);

            newRemotePlayer.movePlayer();
        },

        _battleAnimationsEnemy: function(data){
            var tmpEnemy = this.playerById(data.id, this.enemies);

            if(!tmpEnemy){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            tmpEnemy._batleAnimations(data.direction);
        },

        _battleAnimationsPlayer: function(data){
            var newRemotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer._batleAnimations(data.direction);
        },

        _stopPlayer: function( data ){

            var newRemotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.stop(false);
        },

        _deathPlayer: function( data ){
            var newRemotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.death(false);
        },

        _changePlayerHP: function(data){

            var newRemotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.changeHP(data.value, false);
        },

        _dropItem: function(data){
            var tmpItem = new Itens(this.game, this.socket);
                tmpItem.create(data);

            this.itens.push(tmpItem);
        },


        update: function(){
            if(this.init){

                this.localPlayer.update();
//                this.enemy.update();
                this.camera.update();

                // Adiciona Colisão.
                this.game.physics.arcade.collide(this.localPlayer.player, this.mapa.layer[0]);

                if(this.enemies.length > 0){

                    // Loop no array de Inimigos
                    for(var i = 0; i < this.enemies.length; i++){

                        this.enemies[i].update();

                        this.game.physics.arcade.collide(this.localPlayer.player, this.enemies[i].enemy, this.AtackAnima, null, this);

                        for(var j = 0; j < this.remotePlayer.length; j++){
                            this.game.physics.arcade.collide(this.remotePlayer[j].player, this.enemies[i].enemy, this.remoteAtackAnima, null, this);
                            // Adiciona Colisão.
                            this.game.physics.arcade.collide(this.remotePlayer[j].player, this.mapa.layer[0]);
                        }

                        // Verifica se a arma sobrepoe o inimigo se sim causa danso se nao para o combate.
                        if(this.game.physics.arcade.overlap(this.localPlayer.over, this.enemies[i].enemy)){
//                            this.enemies[i].stop(true);
                            this.enemies[i].battle = true;
                        }else{
                            if(this.enemies[i].battle){
                                this.enemies[i].battle = false;
                                this.enemies[i].stop(true);
                            }
                        }
                    }
                }

                if(this.itens.length > 0){
                    for(var k = 0; k < this.itens.length; k++){
                        this.game.physics.arcade.collide(this.localPlayer.player, this.itens[k].itens, this.getItem, null, this);
                    }
                }
            }
        },

        render: function(){
            if(this.init){
                this.mapa.render();
                this.localPlayer.render();
            }
        },

        getItem: function(obj1, obj2){
            var tmpItem = this.playerById(obj2.id, this.itens);
            this.localPlayer.addStorage(tmpItem);

            tmpItem.death(true);
        },

        _deathItem: function(data){
            var tmpItem = this.playerById(data.itemId, this.itens);

            if(!tmpItem){
                util.log('Item não encontrado: ' + data.itemId);
                return;
            };

            this.itens.splice(this.itens.indexOf(tmpItem), 1);

            tmpItem.death(false);

        },

        remoteAtackAnima: function(obj1, obj2){
            tmpPlayer = this.playerById(obj1.id, this.remotePlayer);
            tmpEnemy  = this.playerById(obj2.id, this.enemies);

            tmpPlayer.battleAnimations(tmpEnemy, false);
            tmpEnemy.battleAnimations(tmpPlayer, false);
        },

        AtackAnima: function(obj1, obj2){
            tmpEnemy = this.playerById(obj2.id, this.enemies);

            this.localPlayer.battleAnimations(tmpEnemy, true);
            tmpEnemy.battleAnimations(this.localPlayer, true);

        },

        // Find player by ID
        playerById: function( id, data ) {

            for (var i = 0; i < data.length; i++) {
                if (data[i].getId() == id)
                    return data[i];
            }

            return false;
        }
    }
})();