(function(){
    'use strict';

    GameCtrl.Game = function(){
        // Socket
        this.socket = null;

        // Mapa
        this.map = null;

        // NPC
        this.npcs = [];

        // Local Player
        this.localPlayer = null;

        // Remote Player
        this.remotePlayer = [];

        // Inimigos
        this.enemy = null;


        this.testText;

        this.pathfinder;
        this.marker;
        this.blocked = false;
        this.walkables = [0];

    };

    GameCtrl.Game.prototype = {

        /**
         * Configura Socket
         */
        _startSocket: function(){
            this.socket = io.connect('http://localhost:3000');
            this._setEventHandlers();
        },

        _setEventHandlers: function(){

            var _this = this;

            //noinspection BadExpressionStatementJS
            this.socket.on('conn', function(data){
                _this._onConnect(data);
            })[_this];

            this.socket.on('disconnect',    this._onDisconnect);

            //noinspection BadExpressionStatementJS
            this.socket.on('create map',  function(data){
                _this._onCreateMap(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('create npc',  function(data){
                _this._onCreateNpc(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('local player',  function(data){
                _this._onLocalPlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('remote player',  function( data ){
                _this._onRemotePlayer( data );
            })[_this];

            this.socket.on('remove player', function(){});

            //noinspection BadExpressionStatementJS
            this.socket.on('move player', function( data){
                _this._onMovePlayer( data );
            })[_this];
        },

        _onConnect: function( data ){
            console.log('Connectado id.: ' + data.id);
            this.socket.emit('create map');
        },

        _onDisconnect: function(){

        },

        _onCreateMap: function(data){
            var service = new Service();
            var map = service.getMaps('http://localhost:3000/api/map/'+data.user.room);

            this.map = new Map(this.game);
            this.map.create(map);

            this.enemy = new Enemy(this.game);
            this.enemy.create();

            this.socket.emit('new player');
            this.socket.emit('create npc', {room: data.user.room});

            this.testText = this.game.add.text(16, 16, 'Drag the sprites. Overlapping: false', { fill: '#ffffff' });
        },

        _onCreateNpc: function( data ){
            var tmpNpc = new Npc(this.game);
                tmpNpc.create(data.npc);

                this.npcs.push(tmpNpc);
        },

        _onLocalPlayer: function( data ){
            this.localPlayer = new Player(this.game, this.socket, data.user, this.map);
            this.localPlayer.create();

            // Camera segue o Jogador
            this.game.camera.follow(this.localPlayer.getPlayer());


            // PathFinder
            this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
            this.pathfinder.setGrid(this.map.map.layers[0].data, this.walkables);

            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0x000000, 1);
            this.marker.drawRect(0, 0, 32, 32);

            console.log('Local: ', data.user.name);

        },

        _onRemotePlayer: function( data ){

            var remotePlayer = new Player(this.game, this.socket, data.user);
            remotePlayer.create();

            this.remotePlayer.push(remotePlayer);

            console.log('Remote: ', data.user.name);
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

        _onRemovePlayer: function(){

        },

        create: function(){
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this._startSocket();
        },

        findPathTo: function(tilex, tiley) {
            this.pathfinder.setCallbackFunction(function(path) {
                path = path || [];
                this.localPlayer.movePlayer(path);
            });

            var px = this.map.layer.getTileX(this.localPlayer.player.body.x);
            var py = this.map.layer.getTileX(this.localPlayer.player.body.x);

            this.pathfinder.preparePathCalculation([px,py], [tilex,tiley]);
            this.pathfinder.calculatePath();
        },

        getPath: function(){
            this.blocked = true;
            this.findPathTo(this.map.layer.getTileX(this.marker.x), this.map.layer.getTileY(this.marker.y));
        },

        update: function(){

            if(this.localPlayer){
                this.localPlayer.update();
//                this.map.update();
                this.enemy.update();

                for(var i = 0; i < this.remotePlayer.length; i++){
                    this.game.physics.arcade.collide(this.localPlayer.getPlayer(), this.remotePlayer[i].getPlayer());
                }

                this.game.physics.arcade.collide(this.localPlayer.player, this.map.layer);

                // Verifica se existe colisão entre localPlayer e Inimigos;
                this.game.physics.arcade.collide(this.localPlayer.player, this.enemy.enemy, this.atack, null, this);

                // Verifica se a arma sobrepoe o inimigo se sim causa danso se nao para o combate.
                if(this.game.physics.arcade.overlap(this.localPlayer.weapon.getWeapon(), this.enemy.enemy)){
//                    console.log('atacando');
                }else{
//                    console.log('fugindo');
                }

                this.marker.x = this.map.layer.getTileX(this.game.input.activePointer.worldX) * 32;
                this.marker.y = this.map.layer.getTileY(this.game.input.activePointer.worldY) * 32;

                if (this.game.input.mousePointer.isDown)
                {
                    this.getPath();
                }

            }

            if(this.npcs.length > 0){
                for(var j = 0; j < this.npcs.length; j++){
                    this.npcs[j].update();
                    this.game.physics.arcade.collide(this.localPlayer.getPlayer(), this.npcs[j].getNpc());

                    for(var i = 0; i < this.remotePlayer.length; i++){
                        this.game.physics.arcade.collide(this.npcs[j].getNpc(), this.remotePlayer[i].getPlayer());
                    }
                }
            }

        },

        // Metodo de atack;
        atack: function(obj1, obj2){
            this.enemy.position();
            this.localPlayer.atack();
        },

        render: function(){
            if(this.localPlayer){
                this.localPlayer.render();
                this.map.render();
                this.enemy.render();
            };

            for(var j = 0; j < this.npcs.length; j++){
                this.npcs[j].render();
            }
        },

        // Find player by ID
        playerById: function( id ) {

            for (var i = 0; i < this.remotePlayer.length; i++) {
                if (this.remotePlayer[i].getId() == id)
                    return this.remotePlayer[i];
            }

            return false;
        }
    };

})();