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
                        this.game.physics.arcade.collide(this.localPlayer.player, this.enemies[i].enemy, this.AtackAnima, null, this);

                        for(var j = 0; j < this.remotePlayer.length; j++){
                            this.game.physics.arcade.collide(this.remotePlayer[j].player, this.enemies[i].enemy);
                        }
                    }
                }

                // Adiciona Colisão entre os players remotos e o Mapa;
//                for(var i = 0; i < this.remotePlayer.length; i++){
//                    this.game.physics.arcade.collide(this.remotePlayer[i].player, this.mapa.layer[0]);
//
//                    for(var j = 0; j < this.enemies.length; j++){
//                        // Local Player
//                        this.game.physics.arcade.collide(this.localPlayer.player, this.enemies[j].enemy, this.AtackAnima, null, this);
//                        // Remote Player
//                        this.game.physics.arcade.collide(this.remotePlayer[i].player, this.enemies[j].enemy, this.AtackAnima, null, this);
//
//                        // Verifica se a arma sobrepoe o inimigo se sim causa danso se nao para o combate.
//                        if(!this.game.physics.arcade.overlap(this.localPlayer.over, this.enemies[j].enemy)){
//                            this.enemy.enemy.animations.stop();
//                        }
//                    }
//                }

                /*
                this.game.physics.arcade.collide(this.localPlayer.player, this.enemy.enemy, this.AtackAnima, null, this);

                // Adiciona Colisão com os Itens
                this.game.physics.arcade.collide(this.localPlayer.player, this.itens.itens, this.getItens, null, this);

                // Verifica se a arma sobrepoe o inimigo se sim causa danso se nao para o combate.
                if(!this.game.physics.arcade.overlap(this.localPlayer.over, this.enemy.enemy)){
                    this.enemy.enemy.animations.stop();
                }
                */
            }
        },

        render: function(){
            if(this.init){
                this.mapa.render();
                this.localPlayer.render();
            }
        },

        AtackAnima: function(obj1, obj2){
            tmpEnemy = this.playerById(obj2.id, this.enemies);

            this.localPlayer.battleAnimations(tmpEnemy);
            tmpEnemy.battleAnimations(this.localPlayer);

        },

        getItens: function(obj1, obj2){
            obj2.kill();
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