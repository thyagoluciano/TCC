(function (){

    EnemySocket = function(conn){
        this.game = conn.game;
        this.socket = conn.socket;
    };

    EnemySocket.prototype = {

        setEventHandlers: function(){
            var _this = this;

            //noinspection BadExpressionStatementJS
            this.socket.on('createEnemy', function(data){
                _this.game._createEnemy(data.enemy);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('deathEnemy', function(data){
                _this.game._deathEnemy(data.id);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('battleAnimationsEnemy', function(data){
                _this.game._battleAnimationsEnemy(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('changeEnemyHP', function(data){
                _this.game._changeEnemyHP(data);;
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('stopEnemy', function(data){
                _this.game._stopEnemy(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('dropItem', function(data){
                _this.game._dropItem(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('deathItem', function(data){
                _this.game._deathItem(data);
            })[_this];


        }
    }
})();