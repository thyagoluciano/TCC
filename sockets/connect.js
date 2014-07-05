module.exports = function(io){
    var sockets = io.sockets;

    var util = require('util');

    var Maps    = require('./jogo/Maps');
    var Player  = require('./jogo/Player');

    var maps = new Maps(io);
        maps.create();

    var players = [];

    // temporarias
    var tmpUsers = ['thyago.luciano', 'karina.felix'];
    var ctrl = 0;

    // Array de Sockets para serpar os eventos
    var Server = require('./Server');

    var listSockets = [];
        listSockets['Server']  = new Server();

    sockets.on('connection', function( client ){
        console.log('Novo Cliente Connectado: ' + client.id);

        initVar(client.id);// Inicia as Variaveis do game

        // EventHandlers
        listSockets['Server'].setEventHandlers(client);


        // Disconnect
        client.on("disconnect", onClientDisconnect);

        // Inicialização
        client.on('game:init', onGameInit);

        // Metodo de movimentação do Jogador
        client.on('player:move', onMovePlayer);
        client.on('player:battleAnimation', onBattleAnimationPlayer);
        client.on('player:changeHP', onChangePlayerHP);
        client.on('player:stop', onStopPlayer);
        client.on('player:death', onDeathPlayer);


//         SOCKETS INIMIGO
        client.on('enemy:battleAnimation', onBattleAnimationEnemy);
        client.on('enemy:stop', onStopEnemy);
        client.on('enemy:changeHP', onChangeEnemyHP);
        client.on('enemy:death', onDeathEnemy);


//         SOCKETS ITENS
        client.on('item:drop', onDropItem);
        client.on('item:remove', onRemoveItem);


    });

    // Metodo que inicializa as variaveis do Game
    function initVar(socketId){
        // Instancia a Classe Player
        var player = new Player(io, tmpUsers[ctrl]);
            player.create(socketId); // Cria o Player

            players.push(player);

        // Controle temporario
        if(ctrl == 1){
            ctrl = 0;
        }else{
            ctrl++;
        }
    }

    // Metodo que disconecta o jogador, removendo do array players e das salas de jogos
    function onClientDisconnect() {
        util.log("Player has disconnected: " + this.id);

        var tmpPlayer = playerById(this.id, players);
        tmpPlayer.savePlayer(); // Salva as propriedades do player no banco de dados

        var room = tmpPlayer.getRoom();

        // Remove o player do array players;
        players.splice(players.indexOf(tmpPlayer), 1);

        // Remove o player do sala de jogo;
        maps.getRoom(room).removePerson(tmpPlayer);
        this.broadcast.to(room).emit('player:disconnect', { id: this.id });
    }

    // Metodos de inicialização
    function onGameInit(){
        // Busca o Player pelo socketID
        var tmpPlayer = playerById(this.id, players);

        // Adiciona o usuario na sala
        this.join(tmpPlayer.getRoom());

        // Envia os dados do jogador e do mapa para o cliente
        this.emit('game:createGame', {id: this.id, user: tmpPlayer.getPlayer(), maps: maps.getRoom(tmpPlayer.getRoom()).getProperties()});

        // Envia o novo Jogador para todos os jogadores conectados na mesma sala
        this.broadcast.to(tmpPlayer.getRoom()).emit('player:remotePlayer', { user: tmpPlayer.getPlayer() });

        var peoples = maps.getRoom(tmpPlayer.getRoom()).getPeoples();

        // Envia os jogadores remotos para o jogar da session
        for(var i = 0; i < peoples.length; i++){
            this.emit('player:remotePlayer', { user: peoples[i].getPlayer() });
        }
        // Adiciona o Jogador na sala;
        maps.getRoom(tmpPlayer.getRoom()).addPerson(tmpPlayer);

        this.emit('enemy:create', {enemies: maps.getRoom(tmpPlayer.getRoom()).getEnemies()});
    }

    // Metodos de movimentação do jogador
    function onMovePlayer(data){
        var tmpPlayer = playerById(this.id, players);

        // Player not found
        if(!tmpPlayer){
            util.log('onMovePlayer: Move Player not found: ' + this.id);
            return;
        };

        tmpPlayer.setDirection(data.direction);
        tmpPlayer.setPosition(data.position);
        tmpPlayer.setFrame(data.frame);

        this.broadcast.to(tmpPlayer.getRoom()).emit('player:move', {direction: tmpPlayer.getDirection(), id: tmpPlayer.getId()});
    }

    // Metodos de animação de batalhao do jogador
    function onBattleAnimationPlayer(data){

        var tmpPlayer = playerById(this.id, players);

        // Player not found
        if(!tmpPlayer){
            util.log('onBattleAnimationPlayer: Player not found ' + this.id);
            return;
        };

        this.broadcast.to(tmpPlayer.getRoom()).emit('player:battleAnimation', {direction: data.direction, id: tmpPlayer.getId()});
    }

    function onChangePlayerHP( data ){
        var tmpPlayer = playerById(data.id, players);

        // Player not found
        if(!tmpPlayer){
            util.log('player:onChangePlayerHP: Player not found' + data.id);
            return;
        };

        tmpPlayer.setHp(data.hp);

        this.broadcast.to(tmpPlayer.getRoom()).emit('player:changeHP', {id: tmpPlayer.getId(), hp: tmpPlayer.getHp()});
    }

    function onStopPlayer(data){
        var tmpPlayer = playerById(this.id, players);

        // Player not found
        if(!tmpPlayer){
            util.log('player:onStopPlayer: Player not found' + this.id);
            return;
        };

        this.broadcast.to(tmpPlayer.getRoom()).emit('player:stop', {id: tmpPlayer.getId()});
    }

    function onDeathPlayer(data){
        var tmpPlayer = playerById(data.id, players);

        // Player not found
        if(!tmpPlayer){
            util.log('onDeathPlayer: Player not found: ' + this.id);
            return;
        };

        this.broadcast.to(tmpPlayer.getRoom()).emit('player:death', {id: tmpPlayer.getId()});
    }

    // Metodos de animação de batalhao dos inimigo
    function onBattleAnimationEnemy(data){

        var enemies = maps.getRoom(data.room).getEnemies();

        var tmpEnemy = playerById(data.id, enemies);

        // Player not found
        if(!tmpEnemy){
            util.log('onBattleAnimationEnemy:Enemy not found ' + data.id);
            return;
        };

        this.broadcast.to(data.room).emit('enemy:battleAnimation', {direction: data.direction, id: tmpEnemy.getId(), heroId: data.heroId});
    }

    // Metodo que para a animação de batalha do Inimigo
    function onStopEnemy(data){

        var enemies = maps.getRoom(data.room).getEnemies();

        var tmpEnemy = playerById(data.id, enemies);

        // Player not found
        if(!tmpEnemy){
            util.log('onStopEnemy:Enemy not found ' + data.id);
            return;
        };

        this.broadcast.to(data.room).emit('enemy:stop', {id: tmpEnemy.getId()});
    }

    function onChangeEnemyHP(data){
        var enemies = maps.getRoom(data.room).getEnemies();

        var tmpEnemy = playerById(data.id, enemies);

        // Player not found
        if(!tmpEnemy){
            util.log('onChangeEnemyHP:Enemy not found ' + data.id);
            return;
        };

        tmpEnemy.setHp(data.hp);


        this.broadcast.to(data.room).emit('enemy:changeHP', {id: tmpEnemy.getId(), hp: tmpEnemy.getHp()});
    }

    function onDeathEnemy(data){

        var enemies = maps.getRoom(data.room).getEnemies();

        var tmpEnemy = playerById(data.id, enemies);

        // Player not found
        if(!tmpEnemy){
            util.log('onEnemyDeath:Enemy not found ' + data.id);
            return;
        };

        this.broadcast.to(data.room).emit('enemy:death', {id: tmpEnemy.getId()});

        maps.getRoom(data.room).removeEnemy(tmpEnemy);
    }

//     METODOS ITENS

    function onDropItem(data){
        var itens = maps.getRoom(data.room).getItens();
        var random = Math.floor(Math.random() * itens.length);

        var tmpItem = itens[random];

        // Envia o Item para o Jogador;
        this.emit('item:drop', { position: data.position, item: tmpItem.getItem(), itemId: tmpItem.itemId });

        // Envia o Item para todos na sala;
        this.broadcast.to(data.room).emit('item:drop', { position: data.position, item: tmpItem.getItem(), itemId: tmpItem.itemId });
    }

    function onRemoveItem(data){
        this.broadcast.to(data.room).emit('item:remove', { itemId: data.itemId });
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