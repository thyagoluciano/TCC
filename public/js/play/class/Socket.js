var socket = (function(){
    var instance;

    function init(){
        var socket = io.connect('http://localhost:3000');

        function onConnect(){
            console.log('Cliente Conectado no servidor!');
        };

        function onDisconnect(){
            console.log('Cliente desconectado do servidor');
        };

        return{
            socket: socket
        };
    };

    return {
        getInstance: function(){
            if( !instance ){
                instance = init();
            }

            return instance;
        }
    };
})();;


//tccGame.Socket = function(){
//    this.socket;
//}
//
//tccGame.Socket.prototype = {
//    create: function(){
//        this.socket = io.connect('http://localhost:3000');
//
//        this.eventHandlers();
//    },
//
//    emit: function(name, data){
//        this.socket.emit(name, data);
//    },
//
//    eventHandlers: function(){
//        this.socket.on('connect', this.onConnect);
//        this.socket.on('disconnect', this.onDisconnect);
//        this.socket.on('new player', this.onNewPlayer);
//    },
//
//    onConnect: function(){
//        console.log('Cliente Conectado no servidor!');
//    },
//
//    onDisconnect: function(){
//        console.log('Cliente desconectado do servidor');
//    },
//
//    onNewPlayer: function(data){
//        console.log(data);
//    }
//}