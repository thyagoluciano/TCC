module.exports = function(io){
    var sockets = io.sockets;
    var util = require('util');

    var Player  = require("./jogo/Player").Player;
    var Room    = require('./jogo/Room');
    var Item    = require('./jogo/Item');

    var players = [];
    var rooms = [];
    var enemies = [];
    var items = [];

    var avatarModel = require('../models/avatar');
    var mapModel    = require('../models/map');

    // temporarias
    var tmpUsers = ['thyago.luciano', 'karina.felix'];

    // Busca os inimigos no banco de dados;
    var enemyAvatar = {
        id: 1,
        "gender": "M",
        "attributes": {
            "str": 10,
            "agi": 5,
            "vit": 54,
            "int": 10,
            "dex": 23,
            "luk": 90,
            "level": 34
        },
        "position": {
            "x": 300,
            "y": 200
        },
        "equipment": {
            "weapon": {
                "type": "dagger",
                "atk": 5,
                "hp": 9
            },
            "torso": {
                "atk": 0,
                "hp": 1
            },
            "legs": {
                "atk": 0,
                "hp": 1
            },
            "head": {
                "atk": 0,
                "hp": 1
            },
            "hands": {
                "atk": 0,
                "hp": 1
            },
            "feet": {
                "atk": 0,
                "hp": 1
            },
            "belt": {
                "atk": 0,
                "hp": 1
            }
        },
        "room": "praia",
        "name": "Skeleton"
    }

    var enemyAvatar2 = {
        id: 2,
        "gender": "M",
        "attributes": {
            "str": 10,
            "agi": 5,
            "vit": 99,
            "int": 10,
            "dex": 23,
            "luk": 90,
            "level": 99
        },
        "position": {
            "x": 350,
            "y": 200
        },
        "equipment": {
            "weapon": {
                "type": "dagger",
                "atk": 5,
                "hp": 9
            },
            "torso": {
                "atk": 0,
                "hp": 1
            },
            "legs": {
                "atk": 0,
                "hp": 1
            },
            "head": {
                "atk": 0,
                "hp": 1
            },
            "hands": {
                "atk": 0,
                "hp": 1
            },
            "feet": {
                "atk": 0,
                "hp": 1
            },
            "belt": {
                "atk": 0,
                "hp": 1
            }
        },
        "room": "praia",
        "name": "Skelleton 2"
    }

    var inimigos = [enemyAvatar, enemyAvatar2];

    onCreateEnemy();

    var ctrl = 0;

    // Crias as Salas de Jogos;
    var roomModel = mapModel.getMap();

    rooms['praia'] = new Room();
    rooms['floresta'] = new Room();

//    roomModel.find({}).exec(function(err, docs){
//       if(err){
//           console.log('Exception: ' + err.toObject());
//       }else{
//           docs.forEach(function(element, index, array){
//                var tmpRoom = new Room();
//                    rooms[element.name] = tmpRoom;
//           });
//       };
//    });

    sockets.on('connection', function(client){
        console.log('Novo Cliente Connectado: ' + client.id);

        client.emit('conn', { id: client.id });

        client.on('createPlayer', onCreatePlayer);
        client.on('movePlayer', onMovePlayer);
        client.on('battleAnimationsPlayer', onBattleAnimationsPlayer);
        client.on('stopPlayer', onStopPlayer);
        client.on('deathPlayer', onDeathPlayer);
        client.on('changePlayerHP', onChangePlayerHP);

        client.on('deathEnemy', onDeathEnemy);
        client.on('battleAnimationsEnemy', onBattleAnimationsEnemy);
        client.on('changeEnemyHP', onChangeEnemyHP);
        client.on('stopEnemy', onStopEnemy);

        client.on('dropItem', onDropItem);
        client.on('deathItem', onDeathItem);
    });

    /*
     * ENEMY
     */
    function onCreateEnemy(){
        for(var i =0; i < inimigos.length; i++){

            var tmpEnemy = Player(inimigos[i]);
            tmpEnemy.setSocketId(inimigos[i].id);

            enemies.push(tmpEnemy);
        }
    }

    function onBattleAnimationsEnemy( data ){
        var moveEnemy = playerById(data.id, enemies);

        // Player not found
        if(!moveEnemy){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        moveEnemy.setAnimationsDirection(data.direction);

        this.broadcast.to('praia').emit('battleAnimationsEnemy', {direction: moveEnemy.getAnimationsDirection(), id: moveEnemy.getId()});
    };

    function onChangeEnemyHP( data ){
        var tmpEnemy = playerById(data.id, enemies);

        // Player not found
        if(!tmpEnemy){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        tmpEnemy.setHp(data.value);

        this.broadcast.to('praia').emit('changeEnemyHP', {id: tmpEnemy.getId(), value: data.value});
    }

    function onDeathEnemy( data ){
        var enemyPlayer = playerById(data.id, enemies);

        // Player not found
        if(!enemyPlayer){
            util.log('Move Player not found: ' + data.id);
            return;
        };

        this.broadcast.to('praia').emit('deathEnemy', {id: enemyPlayer.getId()});

        // Remove o Inimigo do array enemies
        enemies.splice(enemies.indexOf(enemyPlayer), 1);
    }

    function onStopEnemy( data ){

        var tmpEnemy = playerById(data.id, enemies);

        // Player not found
        if(!tmpEnemy){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to('praia').emit('stopEnemy', {id: tmpEnemy.getId()});
    };
    /*
     * FIM ENEMY
     */
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

            // Envia os Inimigos
            for(var j = 0; j < enemies.length; j++){
                socket.emit('createEnemy', {enemy: enemies[j].getUser()});
            }

            var playerRoom = rooms[newPlayer.getRoom()].getPeople();

            // Envia os jogadores remotos para o jogar da session
            for(var i = 0; i < playerRoom.length; i++){
                socket.emit('remotePlayer', {user: playerRoom[i].getUser()});
            }

            rooms[newPlayer.getRoom()].addPerson(newPlayer);
            players.push(newPlayer);

        });

        if(ctrl == 1){
            ctrl = 0;
        }else{
            ctrl++;
        }

    };

    function onMovePlayer( data ){

        var movePlayer = playerById(this.id, players);

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

        var movePlayer = playerById(this.id, players);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        movePlayer.setAnimationsDirection(data.direction);

        this.broadcast.to(movePlayer.getRoom()).emit('battleAnimationsPlayer', {direction: movePlayer.getAnimationsDirection(), id: movePlayer.getId()});
    };


    function onStopPlayer( data ){

        var movePlayer = playerById(this.id, players);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(movePlayer.getRoom()).emit('stopPlayer', {id: movePlayer.getId()});
    };

    function onDeathPlayer( data ){
        var movePlayer = playerById(data.id, players);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(movePlayer.getRoom()).emit('deathPlayer', {id: movePlayer.getId()});
    }

    function onChangePlayerHP( data ){
        var movePlayer = playerById(data.id, players);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + data.id);
            return;
        };

        movePlayer.setHp(data.value);

        this.broadcast.to(movePlayer.getRoom()).emit('changePlayerHP', {id: movePlayer.getId(), value: data.value});
    }


    function onDropItem( data ){

        var itemId = Math.floor(Math.random() * 419)+1;

        var tmpItem = new Item();
            tmpItem.create(itemId);

        items.push(tmpItem);

        this.emit('dropItem', {itemId: itemId, position: data.position});
        this.broadcast.to('praia').emit('dropItem', {itemId: itemId, position: data.position});
    }

    function onDeathItem(data){

        var tmpItem = playerById(data.id, items);

        // Player not found
        if(!tmpItem){
            util.log('Item não encontrado: ' + data.id);
            return;
        };

        this.broadcast.to('praia').emit('deathItem', {itemId: tmpItem.getId()});
    }

    //    Find player by ID
    function playerById( id, data ) {
        var i;
        for (i = 0; i < data.length; i++) {
            if (data[i].getId() == id)
                return data[i];
        };

        return false;
    };
}