(function(){
    'use strict';

    GameCtrl.Game = function(){
        this.socket = null;
        this.localPlayer = null;
        this.remotePlayer = [];
        var _this;
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
            this.socket.on('local player',  function(data){
                _this._onLocalPlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('remote player',  function( data ){
                _this._onRemotePlayer( data );
            })[_this];

            this.socket.on('remove player', function(){});

            this.socket.on('move player', function( data){
                _this._onMovePlayer( data );
            })[_this];
        },

        _onConnect: function( data ){
            console.log('Connectado id.: ' + data.id);
            this.socket.emit('new player');
        },

        _onDisconnect: function(){

        },

        _onLocalPlayer: function( data ){
            this.localPlayer = new Player(this.game, this.socket, data.user);
            this.localPlayer.create();
        },

        _onRemotePlayer: function( data ){
            var remotePlayer = new Player(this.game, this.socket, data.user);
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

        _onRemovePlayer: function(){

        },

        create: function(){
            this._startSocket();
        },

        update: function(){
            if(this.localPlayer){
                this.localPlayer.update();
            }
        },

        render: function(){
            if(this.localPlayer){
                this.localPlayer.render();
            }
        },

        // Find player by ID
        playerById: function( id ) {
            var i;
            for (i = 0; i < this.remotePlayer.length; i++) {
                if (this.remotePlayer[i].getId() == id)
                    return this.remotePlayer[i];
            };

            return false;
        }
    };

})();