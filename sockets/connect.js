module.exports = function(io){
    var sockets = io.sockets;
    var util = require('util');
    var Player  = require("./jogo/Player").Player;
    var players = [];

    var usuario = {
        "name" : "thy4goluciano",
        "id": null,
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
        },
        direction: false,
        velocity: 200
    };


    sockets.on('connection', function(client){
        console.log('Novo Cliente Connectado: ' + client.id);

        client.emit('conn', { id: client.id});

        client.on('new player', onNewPlayer);
        client.on('move player', onMovePlayer);
    });

    function onNewPlayer(data){

        var newPlayer = Player();
            newPlayer.setUser(usuario);
            newPlayer.setId(this.id);

        // Emit a mensagem para todos os conectado menos o proprio;
        this.broadcast.emit('remote player', { user: newPlayer.getUser() });

        // Emit a mensagem para o proprio jogador;
        this.emit('local player', {user: newPlayer.getUser()});

        for(var i = 0; i < players.length; i++){
            this.emit('remote player', {user: players[i].getUser()});
        }

        players.push(newPlayer);
    };

    function onMovePlayer( data ){
        var movePlayer = playerById(data.id);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + data.id);
            return;
        };

        movePlayer.setDirection(data.direction);

        this.broadcast.emit('move player', {direction: movePlayer.getDirection(), id: movePlayer.getId()});
    }


    // Find player by ID
    function playerById( id ) {
        var i;
        for (i = 0; i < players.length; i++) {
            if (players[i].getId() == id)
                return players[i];
        };

        return false;
    };
};