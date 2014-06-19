(function (){

    PlayerSocket = function(conn){
        this.game = conn.game;
        this.socket = conn.socket;
    };

    PlayerSocket.prototype = {

        createPlayer: function(){
            this.socket.emit('createPlayer');
        },

        setEventHandlers: function(){
            var _this = this;

            //noinspection BadExpressionStatementJS
            this.socket.on('localPlayer', function(data){
                _this.game._createPlayer(data.user);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('remotePlayer', function(data){
                _this.game._onRemotePlayer(data.user);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('movePlayer', function(data){
                _this.game._onMovePlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('battleAnimationsPlayer', function(data){
                _this.game._battleAnimationsPlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('stopPlayer', function(data){
                _this.game._stopPlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('deathPlayer', function(data){
                _this.game._deathPlayer(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('changePlayerHP', function(data){
                _this.game._changePlayerHP(data);
            })[_this];
        }
    }
})();
