(function (){

    EnemySocket = function(conn){
        this.game = conn.game;
        this.socket = conn.socket;
    };

    EnemySocket.prototype = {

        create: function(){
            this.socket.emit('createEnemy');
        },

        setEventHandlers: function(){
            var _this = this;


        }
    }
})();
