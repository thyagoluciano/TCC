module.exports = function(io){
    var sockets = io.sockets;
    var util = require('util');

    var Player  = require("./jogo/Player").Player;
    var Room    = require('./jogo/Room');

    var players = [];
    var rooms = [];
    var enemies = [];

    var avatarModel = require('../models/avatar');
    var mapModel    = require('../models/map');

    // temporarias
    var tmpUsers = ['thyago.luciano', 'karina.felix'];

    // Busca os inimigos no banco de dados;
    var enemyAvatar = {
        id: 1,
        name: 'Skelleton',
        gender: 'M',
        room: 'praia',
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
    var enemyAvatar2 = {
        id: 2,
        name: 'Skelleton',
        gender: 'M',
        room: 'praia',
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
            x: 350,
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
    var inimigos = [enemyAvatar, enemyAvatar2];
    onCreateEnemy();

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
       };
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

        client.on('deathEnemy', onDeathEnemy);
        client.on('battleAnimationsEnemy', onBattleAnimationsEnemy);
        client.on('changeEnemyHP', onChangeEnemyHP);

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

        ctrl++;
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
        var movePlayer = playerById(this.id, players);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(movePlayer.getRoom()).emit('deathPlayer', {id: movePlayer.getId()});
    }

    function onChangePlayerHP( data ){
        var movePlayer = playerById(this.id, players);

        // Player not found
        if(!movePlayer){
            util.log('Move Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(movePlayer.getRoom()).emit('changePlayerHP', {id: movePlayer.getId(), value: data.value});
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