module.exports = function(io){
    var sockets = io.sockets;
    var util = require('util');
    var Player  = require("./jogo/Player").Player;
    var players = [];

    var usuario = {
        "name" : "thy4goluciano",
        "attributes" : {
            "for" : 33,
            "agi" : 4,
            "vit" : 2,
            "int" : 1,
            "des" : 8,
            "sor" : 99
        },
        equipment: {
            weapon: {type: "dagger"},
            torso: {},
            legs: {},
            head: {},
            hands: {},
            feet: {},
            belt: {}
        },
        "gender" : "M",
        position: {
            x: 100,
            y: 100
        }
    };


    sockets.on('connection', function(client){
        console.log('Novo Cliente Connectado: ' + client.id);
        client.on('new player', onNewPlayer);

        client.emit('new player', { usuario: usuario});

    });

    sockets.on('new player', function(data){
        console.log(data);
    });

    function onNewPlayer(){
        // Adiciona o ID de Session ao usuario;
        usuario._sessionId = this.id;

        // Cria uma nova instancia de Usuario
        var newPlayer = new Player(usuario);

        console.log(newPlayer.getUsuario());

        // Adiciona o novo Player no array de players
        players.push(newPlayer);

        // Emit a mensagem para todos os conectado menos o proprio;
        this.broadcast.emit('new player', { usuario: newPlayer.getUsuario()});

        var i, existingPlayer;

        for(i = 0; i < players.length; i++){
            existingPlayer = players[i];
            this.emit('new player', {usuario: existingPlayer.getUsuario()});
        }
    }




//    sockets.on('connection', function(socket){
//
//
//        socket.on('move player', onMovePlayer);
//
//
//        // Ao Conectar cria o novo jogador.
//        util.log("New Player: " + socket.id);
//
//        usuario.id = socket.id;
//
//        var newPlayer = new Player(usuario.position);
//        players.push(newPlayer);
//
//        // Broadcast new player to connected socket clients;
//        socket.broadcast.emit('create player', usuario);
//
//        var i, existingPlayer;
//
//        for(i = 0; i < players.length; i++){
//            existingPlayer = players[i];
//            socket.emit("create player", usuario);
//        }
//    });
//
//
//    function onMovePlayer( data ){
////        util.log(this.id);
//
//        var movePlayer = playerById(this.id);
//
//        if(!movePlayer){
//            util.log('MovePlayer not found: ' + this.id);
//            return;
//        }
//
//        movePlayer.setDirection(data.direction);
//
//        this.broadcast.emit('move player', {direction: movePlayer.getDirection, id: this.id});
//
//    };
//
//    // Find player by ID
//    function playerById( id ) {
//        var i;
//        for (i = 0; i < players.length; i++) {
//            if (players[i].getId() == id)
//                return players[i];
//        };
//
//        return false;
//    };
};