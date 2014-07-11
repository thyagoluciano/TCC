(function(){

    EnemySocket = function(conn){
        this.game = conn.game;
        this.socket = conn.socket;
    };

    EnemySocket.prototype = {

        setEventHandlers: function(){
            var _this = this;

            //noinspection BadExpressionStatementJS
            this.socket.on('enemy:create', function(data){
                _this.game._onCreateEnemy(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('enemy:battleAnimation', function(data){
                _this.game._battleAnimationsEnemy(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('enemy:stop', function(data){
                _this.game._stopEnemy(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('enemy:changeHP', function(data){
                _this.game._changeEnemyHP(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('enemy:death', function(data){
                _this.game._deathEnemy(data.id);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('item:drop', function(data){
                _this.game._dropItem(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('item:remove', function(data){
                _this.game._removeItem(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('item:use', function(data){
                _this.game._useItem(data);
            })[_this];

            //noinspection BadExpressionStatementJS
            this.socket.on('item:useRemote', function(data){
                _this.game._useItemRemote(data);
            })[_this];


        }
    }
})();