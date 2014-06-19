(function(){
    Connect = function(game){
        this.socket;
        this.game = game;
        this.listSockets = [];
    };

    Connect.prototype = {
        connect: function(){
            this.socket = io.connect('http://localhost:3000');

            this.listSockets['Player']  = new PlayerSocket(this);
            this.listSockets['Enemy']   = new EnemySocket(this);

            this.setEventHandlers();
        },

        setEventHandlers: function(){
            var _this = this;

            //noinspection BadExpressionStatementJS
            this.socket.on('conn', function(data){
                console.log('ClienteID: '+ data.id);
                _this.game._create();
            })[_this];

            this.listSockets['Player'].setEventHandlers();
            this.listSockets['Enemy'].setEventHandlers();

        },

        getSocket: function(key){
            return this.listSockets[key];
        }
    };
})();