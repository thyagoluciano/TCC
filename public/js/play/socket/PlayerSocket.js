(function(){

    PlayerSocket = function(conn){
        this.game = conn.game;
        this.socket = conn.socket;
    };

    PlayerSocket.prototype = {

        setEventHandlers: function(){
            var _this = this;

            //noinspection BadExpressionStatementJS
            this.socket.on('player:remotePlayer', function(data){
                _this.game._onRemotePlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('player:disconnect', function(data){
                console.log('Disconnect.: ' + data.id);
                _this.game._onDisconnect(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('player:move', function(data){
                _this.game._onMovePlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('player:battleAnimation', function(data){
                _this.game._battleAnimationsPlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('player:changeHP', function(data){
                _this.game._changePlayerHP(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('player:stop', function(data){
                _this.game._stopPlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('player:death', function(data){
                _this.game._deathPlayer(data);
            })[_this];
        }
    }
})();