//module.exports = function(io){
//    var sockets = io.sockets;
//    var util = require('util');
//    var Player  = require("./jogo/Player").Player;
//    var players = [];
//    var db = require("./jogo/DataBase").DataBase;
//
//    var ctrl = 0;
//
//    var u = new db()
//    var usuarios = u;
//
////    var rooms = ['praia', 'cidade', 'floresta', 'deserto', 'caverna'];
//
//    sockets.on('connection', function(client){
//        console.log('Novo Cliente Connectado: ' + client.id);
//
//        client.emit('conn', { id: client.id});
//
//        client.on('new player', onNewPlayer);
//        client.on('move player', onMovePlayer);
//    });
//
//    function onNewPlayer(data){
//
//        var newPlayer = Player();
//            newPlayer.setUser(usuarios.getDb[ctrl]);
//            newPlayer.setId(this.id);
//
////        var room = newPlayer.getRoom();
//
//        // Add Usuario na Sala do mapa especifico
//        // send client to room 1
////        this.join(room);
//
//        ctrl++;
//
//        console.log(newPlayer.getUser());
//
//        // Emit a mensagem para todos os conectado menos o proprio;
//        this.broadcast.emit('remote player', { user: newPlayer.getUser() });
////        this.broadcast.to(room).emit('remote player', { user: newPlayer.getUser() });;
//
//        // Emit a mensagem para o proprio jogador;
//        this.emit('local player', {user: newPlayer.getUser()});
//
//        for(var i = 0; i < players.length; i++){
//            this.emit('remote player', {user: players[i].getUser()});
//        }
//
//        players.push(newPlayer);
//    };
//
//    function onMovePlayer( data ){
//        var movePlayer = playerById(data.id);
//
//        // Player not found
//        if(!movePlayer){
//            util.log('Move Player not found: ' + data.id);
//            return;
//        };
//
//        movePlayer.setDirection(data.direction);
//        movePlayer.setPosition(data.position);
//        movePlayer.setFrame(data.frame);
//
//        var room = movePlayer.getRoom();
//        this.broadcast.emit('move player', {direction: movePlayer.getDirection(), id: movePlayer.getId()});
////        this.broadcast.to(room).emit('move player', {direction: movePlayer.getDirection(), id: movePlayer.getId()});
//    }
//
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
//};