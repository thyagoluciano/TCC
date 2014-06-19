(function(){

    GameCtrl.Game = function(){
        this.socket;
        this.init = false;
        this.mapa;
        this.localPlayer;
        this.remotePlayer = [];
        this.camera;

        this.ataque = true;

        this.enemy = [];

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

            // Instancia a classe Cliente;
//            this.socket = new Cliente(this);
            this.socket = new Connect(this);
            // Connecta no servidor de socket.
            this.socket.connect();
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
            var newRemotePlayer = this.playerById(data.id);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.setDirection(data.direction);

            newRemotePlayer.movePlayer();
        },

        _battleAnimationsPlayer: function(data){
            var newRemotePlayer = this.playerById(data.id);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer._batleAnimations(data.direction);
        },

        _stopPlayer: function( data ){

            var newRemotePlayer = this.playerById(data.id);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.stop(false);
        },

        _deathPlayer: function( data ){
            var newRemotePlayer = this.playerById(data.id);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.death(false);
        },

        _changePlayerHP: function(data){

            var newRemotePlayer = this.playerById(data.id);

            if(!newRemotePlayer){
                util.log('Move Player not found: ' + data.id);
                return;
            };

            newRemotePlayer.changeHP(data.value, false);
        },

        _create: function(){
            //Cria o Mapa
            this.mapa = new Mapa(this.game);
            this.mapa.create();

            // Cria o Player Local
            var createPlayer = this.socket.getSocket('Player');
                createPlayer.createPlayer();
//            this.socket.createPlayer();

            // Cria os Inimigos
            var createEnemy = this.socket.getSocket('Enemy');
                createEnemy.create();
//            this.enemy = new Enemy(this.game, this.enemyAvatar);
//            this.enemy.create();

            // Inicializa Update e o render
//            this.init = true;
        },

        update: function(){
            if(this.init){
                this.localPlayer.update();
                this.enemy.update();
                this.camera.update();

                // Adiciona Colisão.
                this.game.physics.arcade.collide(this.localPlayer.player, this.mapa.layer[0]);
                this.game.physics.arcade.collide(this.localPlayer.player, this.enemy.enemy, this.AtackAnima, null, this);

                // Adiciona Colisão com os Itens
                this.game.physics.arcade.collide(this.localPlayer.player, this.itens.itens, this.getItens, null, this);

                // Adiciona Colisão entre os players remotos e o Mapa;
                for(var i = 0; i < this.remotePlayer.length; i++){
                    this.game.physics.arcade.collide(this.remotePlayer[i].player, this.mapa.layer[0]);
                    this.game.physics.arcade.collide(this.remotePlayer[i].player, this.enemy.enemy, this.AtackAnima, null, this);
                }


                // Verifica se a arma sobrepoe o inimigo se sim causa danso se nao para o combate.
                if(!this.game.physics.arcade.overlap(this.localPlayer.over, this.enemy.enemy)){
                    this.enemy.enemy.animations.stop();
                }
            }
        },

        render: function(){
            if(this.init){
                this.mapa.render();
                this.localPlayer.render();
            }
        },

        AtackAnima: function(){
            this.localPlayer.battleAnimations(this.enemy);
            this.enemy.battleAnimations(this.localPlayer);
        },

        getItens: function(obj1, obj2){
            obj2.kill();
        },

        // Find player by ID
        playerById: function( id ) {

            for (var i = 0; i < this.remotePlayer.length; i++) {
                if (this.remotePlayer[i].getId() == id)
                    return this.remotePlayer[i];
            }

            return false;
        }
    }
})();