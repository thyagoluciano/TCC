module.exports = function(io){
    var sockets = io.sockets;
    var util = require('util');

    var Player  = require("./jogo/Player").Player;
    var Room    = require('./jogo/Room');

    var players = [];
    var rooms = [];

    var avatarModel = require('../models/avatar');
    var mapModel    = require('../models/map');


// temporarias
    var tmpUsers = ['thyago.luciano', 'karina.felix'];
    var ctrl = 0;

    // Crias as Salas de Jogos;
    var roomModel = mapModel.getMap();
    roomModel.find({}).exec(function(err, docs){
       if(err){
           console.log('Exception: ' + err.toObject());
       }else{
           docs.forEach(function(element, index, array){
                var tmpRoom = new Room();
               rooms[element.name] = tmpRoom;
           });
       }
    });

    sockets.on('connection', function(client){
        console.log('Novo Cliente Connectado: ' + client.id);

        client.emit('conn', { id: client.id });
        client.on('createPlayer', onCreatePlayer);
        client.on('movePlayer', onMovePlayer);
        client.on('battleAnimationsPlayer', onBattleAnimationsPlayer);
        client.on('stopPlayer', onStopPlayer);
        client.on('deathPlayer', onDeathPlayer);
        client.on('changePlayerHP', onChangePlayerHP);


        client.on('createEnemy', onCreateEnemy);

    });

    function onCreateEnemy(){
        var enemyAvatar = {
            name: 'Skelleton',
            gender: 'M',
            sprite: {
                atlas: '',
                imagem: ''
            },
            attributes: {
                str: 12,
                agi: 2,
                vit: 6,
                int: 10,
                dex: 40,
                luk: 90,
                level: 20
            },
            position: {
                x: 300,
                y: 200
            },
            storage: {

            },
            equipment: {
                weapon: {
                    atk: 0,
                    hp: 1
                },
                torso: {
                    atk: 0,
                    hp: 1
                },
                legs: {
                    atk: 0,
                    hp: 1
                },
                head: {
                    atk: 0,
                    hp: 1
                },
                hands: {
                    atk: 0,
                    hp: 1
                },
                feet: {
                    atk: 0,
                    hp: 1
                },
                belt: {
                    atk: 0,
                    hp: 1
                }
            }
        };

        var enemyPlayer = Player(enemyAvatar);
    }

    function onCreatePlayer(){

        var model = avatarModel.getAvatar();

        var socket = this;

        model.findOne({name: tmpUsers[ctrl]}).exec(function(err, docs){

            var data = docs.toObject();

            var newPlayer = Player(data);
                newPlayer.setSocketId(socket.id);

            // Adiciona o usuario na sala especifica
            socket.join(newPlayer.getRoom());

            // Emit a mensagem para todos os conectado menos o proprio;
            socket.broadcast.to(newPlayer.getRoom()).emit('remotePlayer', { user: newPlayer.getUser() });

            // Envia a mensagem para o proprio jogador;
            socket.emit('localPlayer', {user: newPlayer.getUser()});

            var playerRoom = rooms[newPlayer.getRoom()].getPeople();

            // Envia os jogadores remotos para o jogar da session
            for(var i = 0; i < playerRoom.length; i++){
                socket.emit('remotePlayer', {user: playerRoom[i].getUser()});
            }

            rooms[newPlayer.getRoom()].addPerson(newPlayer);
            players.push(newPlayer);

        });

        ctrl++;
    };

    function onMovePlayer( data ){

        var movePlayer = playerById(this.id);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        movePlayer.setDirection(data.direction);
        movePlayer.setPosition(data.position);
        movePlayer.setFrame(data.frame);

        this.broadcast.to(movePlayer.getRoom()).emit('movePlayer', {direction: movePlayer.getDirection(), id: movePlayer.getId()});
    };

    function onBattleAnimationsPlayer( data ){

        var movePlayer = playerById(this.id);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        movePlayer.setAnimationsDirection(data.direction);

        this.broadcast.to(movePlayer.getRoom()).emit('battleAnimationsPlayer', {direction: movePlayer.getAnimationsDirection(), id: movePlayer.getId()});
    };

    function onStopPlayer( data ){

        var movePlayer = playerById(this.id);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(movePlayer.getRoom()).emit('stopPlayer', {id: movePlayer.getId()});
    };

    function onDeathPlayer( data ){
        var movePlayer = playerById(this.id);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(movePlayer.getRoom()).emit('deathPlayer', {id: movePlayer.getId()});
    }

    function onChangePlayerHP( data ){
        var movePlayer = playerById(this.id);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(movePlayer.getRoom()).emit('changePlayerHP', {id: movePlayer.getId(), value: data.value});
    }

    //    Find player by ID
    function playerById( id ) {
        var i;
        for (i = 0; i < players.length; i++) {
            if (players[i].getId() == id)
                return players[i];
        };

        return false;
    };
}


/*
module.exports = function(io){
    var sockets = io.sockets;
    var util = require('util');
    var Player  = require("./jogo/Player").Player;
    var Room    = require('./jogo/Room');
    var players = [];
    var db = require("./jogo/DataBase").DataBase;


    // Variaveis temporaria Remover na versão final
    var ctrl = 0;
    var u = new db();
    var usuarios = u;

    var tmp = ['praia', 'floresta'];

    var room = [];

    for(var u = 0; u < tmp.length; u++){
        var s = new Room();
        room[tmp[u]] = s;
    }

    sockets.on('connection', function(client){
        console.log('Novo Cliente Connectado: ' + client.id);

        client.emit('conn', { id: client.id});
        client.on('create map', onCreatMap);
        client.on('new player', onNewPlayer);
        client.on('move player', onMovePlayer);
        client.on('create npc', onCreatNpc);
    });

    function onCreatNpc(data){
        for(var i = 0; i < usuarios.getNpc.length; i++){
            if(data.room == usuarios.getNpc[i].room){
                this.emit('create npc', {npc: usuarios.getNpc[i]});
            }
        };
    }

    function onCreatMap(){
        this.emit('create map', {user: usuarios.getDb[ctrl]});
    }

    function onNewPlayer(data){

        var newPlayer = Player();
        newPlayer.setUser(usuarios.getDb[ctrl]);
        newPlayer.setId(this.id);

        // Add Usuario na Sala do mapa especifico
        // send client to room 1
        this.join(newPlayer.getRoom());

//        console.log(this.manager.roomClients[this.id]);

        ctrl++;

        // Emit a mensagem para todos os conectado menos o proprio;
//        this.broadcast.emit('remote player', { user: newPlayer.getUser() });
        this.broadcast.to(newPlayer.getRoom()).emit('remote player', { user: newPlayer.getUser() });;

        // Emit a mensagem para o proprio jogador;
        this.emit('local player', {user: newPlayer.getUser()});

        var playerRoom = room[newPlayer.getRoom()].getPeople();

        for(var i = 0; i < playerRoom.length; i++){
            this.emit('remote player', {user: playerRoom[i].getUser()});
        }

        room[newPlayer.getRoom()].addPerson(newPlayer);
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
        movePlayer.setPosition(data.position);
        movePlayer.setFrame(data.frame);

//        this.broadcast.emit('move player', {direction: movePlayer.getDirection(), id: movePlayer.getId()});
        this.broadcast.to(movePlayer.getRoom()).emit('move player', {direction: movePlayer.getDirection(), id: movePlayer.getId()});
    }


//    Find player by ID
    function playerById( id ) {
        var i;
        for (i = 0; i < players.length; i++) {
            if (players[i].getId() == id)
                return players[i];
        };

        return false;
    };
};

    */