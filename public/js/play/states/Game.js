(function(){
    GameCtrl.Game = function(){
        this.socket; // Socket
        this.init = false;
        this.camera; // Camera

        this.map;
        this.localPlayer;
        this.remotePlayer = [];
        this.enemies = [];
        this.itens = [];

    };

    GameCtrl.Game.prototype = {
        create: function(){
            // Inicia o sistema de Fisica do Jogo;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.socket = new Connect(this);
            // Connecta no servidor de socket.
            this.socket.connect();
        },

        update: function(){
            if(this.init){
                this.localPlayer.update();
                this.camera.update();

                // Adiciona Colisão Player Local.
                this.game.physics.arcade.collide(this.localPlayer.player, this.map.layer[0], function(obj1, obj2){
                    if(obj2.index === 27 && obj2.x === 18 && obj2.y === 85){
                        obj1.x = 570;
                        obj1.y = 2680;
                        console.log(obj1.x, obj1.y)
                    }
                });

                if(this.remotePlayer.length > 0){
                    this.colisaoRemotePlayer();
                }

                if(this.enemies.length > 0){
                    this.colisaoEnemy();
                }

                if(this.itens.length > 0){
                    this.colisaoItens();
                }
            }
        },

        render: function(){
            if(this.init){
                this.localPlayer.render();
/*
                if(this.enemies.length > 0){
                    for(var i = 0; i < this.enemies.length; i++){
                        this.enemies[i].render();
                    }
                }
*/
            }
        },

        // VERIFICA A COLISÃO DOS ITENS COM O JOGADOR LOCAL E COM OS JOGADORES REMOTOS
        colisaoItens: function(){
            for(var i = 0; i < this.itens.length; i++){
                // Adiciona Colisão.
                this.game.physics.arcade.collide(this.localPlayer.player, this.itens[i].item, this.coletaItem, null, this);

//                if(this.remotePlayer.length > 0){
//                    for(var j = 0; j < this.remotePlayer.length; j++){
//                        this.game.physics.arcade.collide(this.remotePlayer[j].player, this.itens[i].item, function(obj1, obj2){
//                            obj2.kill();
//                        }, null, this);
//                    }
//                }
            }
        },

        coletaItem: function(obj1, obj2){
            var tmpItem  = this.playerById(obj2.id, this.itens);

            switch (obj2.properties.type){
                case 'item':
                    console.log('item');
//                    this.localPlayer.addStorage(tmpItem);
                    break;
                case 'hp':
                    var restauraHP = ((this.localPlayer.getHp() * obj2.properties.value) / 100);
                        restauraHP = Math.floor(restauraHP);

                    var total = this.localPlayer.user.hpTotal - this.localPlayer.getHp() ;

                    console.log(total, restauraHP);
                    if(total > restauraHP){
                        this.localPlayer.changeHP(restauraHP);
                    }else{
                        this.localPlayer.changeHP(total);
                    }

                    break;
                case 'weapon':
//                    this.localPlayer.addStorage(tmpItem);
                    console.log('weapon');
                    break;
            }

            this.socket.socket.emit('item:remove', {itemId: tmpItem.getId(), room: this.localPlayer.getRoom()});

            obj2.kill();

        },

        // VERIFICA A COLISÃO DOS JOGADORES REMOTOS COM O MAPA
        colisaoRemotePlayer: function(){
            for(var j = 0; j < this.remotePlayer.length; j++){
                // Adiciona Colisão.
                this.game.physics.arcade.collide(this.remotePlayer[j].player, this.map.layer[0]);
            }
        },

        // VERIFICA A COLISÃO DOS INIMIGOS COM O JOGADOR LOCAL E COM OS JOGADORES REMOTOS
        colisaoEnemy: function(){
            for(var i = 0; i < this.enemies.length; i++){
                this.enemies[i].update();

                this.game.physics.arcade.collide(this.localPlayer.player, this.enemies[i].enemy, this.AtackAnima, null, this);
                // Verifica se a arma sobrepoe o inimigo se sim causa danos se nao para o combate.
                if(this.game.physics.arcade.overlap(this.localPlayer.over, this.enemies[i].enemy)){
                        this.enemies[i].battle = true;
                }else{
                        if(this.enemies[i].battle){
                            this.enemies[i].battle = false;
                            this.enemies[i].stop(true);
                        }
                }

                if(this.remotePlayer.length > 0){
                    for(var j = 0; j < this.remotePlayer.length; j++){
//                        this.game.physics.arcade.collide(this.remotePlayer[j].player, this.enemies[i].enemy, this.remoteAtackAnima, null, this);
//                        // Adiciona Colisão.
                        this.game.physics.arcade.collide(this.remotePlayer[j].player, this.enemies[i].enemy);
                    }
                }
            }
        },

        // ANIMAÇÃO DA BATALHA
        AtackAnima: function(obj1, obj2){
            var tmpEnemy = this.playerById(obj2.id, this.enemies);

            this.localPlayer.battleAnimations(tmpEnemy, true);
            tmpEnemy.battleAnimations(this.localPlayer, true);
        },

        // ANIMAÇÃO DA BATALHA
//        remoteAtackAnima: function(obj1, obj2){
//
//            console.log(obj1.id);
//            var tmpEnemy = this.playerById(obj2.id, this.enemies);
//            var tmpPlayer = this.playerById(obj1.id, this.remotePlayer);
////
//            tmpPlayer.battleAnimations(tmpEnemy);
//            tmpEnemy.battleAnimations(tmpPlayer);
//        },

        _create: function(data){

            // Renderiza o MAPA
            this.map = new Mapa(this.game);
            this.map.create(data);

            // Create Player
            this.localPlayer = new Player(this.game, data.user, this.socket);
            this.localPlayer.create();

            // Cria a Camera
            this.camera = new Camera(this.game, this.localPlayer.player);
            this.camera.create();

            // Inicializa o Update do Jogador
            this.init = true;
        },

        /**
         * SOCKETS PARA O JOGADOR
         */
        // Aciona a animaçao de batalha
        _battleAnimationsPlayer: function(data){
            var tmpPlayer = this.playerById(data.id, this.remotePlayer);

            if(!tmpPlayer){
                console.log('Game:_battleAnimationsPlayer: not found: ' + data.id);
                return;
            };

            tmpPlayer._batleAnimations(data.direction);
        },

        // Adiciona o jogador no game, e tambem no array de jogadores remotos
        _onRemotePlayer: function( data ){
            var remotePlayer = new Player(this.game, data.user, this.socket);
                remotePlayer.create();

            this.remotePlayer.push(remotePlayer);
        },

        // Movimenta o jogador remoto
        _onMovePlayer: function(data){
            var remotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!remotePlayer){
                console.log('Move Player not found: ' + data.id);
                return;
            };

            remotePlayer.setDirection(data.direction);

            remotePlayer.movePlayer();
        },

        // Disconecta o jogador, e retira o mesmo do array.
        _onDisconnect: function(data){
            var tmpPlayer = this.playerById(data.id, this.remotePlayer);

            this.remotePlayer.splice(this.remotePlayer.indexOf(tmpPlayer), 1);

            tmpPlayer.player.kill();
            tmpPlayer.over.kill();
        },

        // Altera o HP do Usuario
        _changePlayerHP: function(data){

            var remotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!remotePlayer){
                console.log('Game:_changePlayerHP: Player not found ' + data.id);
                return;
            };

            remotePlayer.setHP(data.hp);
        },

        _stopPlayer: function( data ){

            var remotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!remotePlayer){
                console.log('Game: _stopPlayer: Player not found ' + data.id);
                return;
            };

            remotePlayer.stop(false);
        },

        _deathPlayer: function( data ){
            var remotePlayer = this.playerById(data.id, this.remotePlayer);

            if(!remotePlayer){
                console.log('Game:_deathPlayer : Player not found: ' + data.id);
                return;
            };

            remotePlayer.death(false);
        },

        /**
         * SOCKETS PARA OS INIMIGOS
         */
        // Enemies
        _onCreateEnemy: function(data){
            var enemies = data.enemies;

            for(var i = 0; i < enemies.length; i++){
                var tmpEnemy = new Enemy(this.game, enemies[i].enemy, this.socket);
                    tmpEnemy.id = enemies[i].enemy.id;
                    tmpEnemy.create();

                this.enemies.push(tmpEnemy);
            }
        },

        // Aciona a animaçao do inimigo
        _battleAnimationsEnemy: function(data){

            var tmpEnemy = this.playerById(data.id, this.enemies);
            var tmpHero = this.playerById(data.heroId, this.remotePlayer);

            if(!tmpEnemy){
                util.log('Game:_battleAnimationsEnemy: Enemy not found ' + data.id);
                return;
            };

            if(!tmpHero){
                util.log('Game:_battleAnimationsEnemy: RemotePlayer not found ' + data.id);
                return;
            };

            tmpEnemy._batleAnimations(data.direction, tmpHero);
        },

        _stopEnemy: function( data ){

            var tmpEnemy = this.playerById(data.id, this.enemies);

            if(!tmpEnemy){
                util.log('Game:_stopEnemy -  Enemy not found: ' + data.id);
                return;
            };

            tmpEnemy.stop(false);
        },

        _changeEnemyHP: function(data){

            var tmpEnemy = this.playerById(data.id, this.enemies);

            if(!tmpEnemy){
                console.log('Game:_changeEnemyHP: Enemy not found: ' + data.id);
                return;
            };

            tmpEnemy._changeHP(data.hp);
        },

        _deathEnemy: function(id){
            var tmpEnemy = this.playerById(id, this.enemies);

            if(!tmpEnemy){
                console.log('Game:_deathEnemy: not found: ' + id);
                return;
            };

            this.enemies.splice(this.enemies.indexOf(tmpEnemy), 1);

            tmpEnemy.death(false);
        },

        /**
         * SOCKETS PARA ITENS
         */
        // DROPA ITENS
        _dropItem: function(data){

            var tmpItem = new Itens(this.game, this.socket);
                tmpItem.create(data, data.itemId);

            this.itens.push(tmpItem);
        },

        _removeItem: function(data){
            var tmpItem = this.playerById(data.itemId, this.itens);
                tmpItem.item.kill();
        },

        _useItem: function(data){

            switch (data.item.type.name){
                case 'equip':
                    if(this.localPlayer.user.equipment){
                        this.localPlayer.user.equipment[data.item.spriteSheet.type] = {};
                    }else{
                        this.localPlayer.user.equipment = [];
                    }

                    this.localPlayer.user.equipment[data.item.spriteSheet.type] = data.item;
                    this.localPlayer.trocaEquipPlayer();

                    break;
                case 'consumo':

                    break;
            }
        },

        _useItemRemote: function(data){

            var remotePlayer = this.playerById(data.playerId, this.remotePlayer);

            switch (data.item.type.name){
                case 'equip':
                    if(remotePlayer.user.equipment){
                        remotePlayer.user.equipment[data.item.spriteSheet.type] = {};
                    }else{
                        remotePlayer.user.equipment = [];
                    }

                    remotePlayer.user.equipment[data.item.spriteSheet.type] = data.item;
                    remotePlayer.trocaEquipPlayer();
                    break;
                case 'consumo':

                    break;
            }
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