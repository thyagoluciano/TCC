(function(){
    Connect = function(game){
        this.socket = GameCtrl.socket;
        this.game = game;
        this.listSockets = [];
    };

    Connect.prototype = {
        connect: function(){
            this.socket.emit('game:init');

            this.listSockets['Player']  = new PlayerSocket(this);
            this.listSockets['Enemy']   = new EnemySocket(this);

            // Inicializa os Eventos
            this.setEventHandlers();
        },

        setEventHandlers: function(){
            var _this = this;

            //noinspection BadExpressionStatementJS
            this.socket.on('game:createGame', function(data){
                _this.game._create(data);
            })[_this];

            this.listSockets['Player'].setEventHandlers();
            this.listSockets['Enemy'].setEventHandlers();
        },

        getSocket: function(key){
            return this.listSockets[key];
        }
    };
})();