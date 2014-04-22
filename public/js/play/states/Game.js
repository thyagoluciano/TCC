tccGame.Game = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    this.cursors;

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.socket;
    this.player;
};

tccGame.Game.prototype = {

    create: function () {
        this.socket = io.connect('http://localhost:3000');

        this.physics.startSystem(Phaser.Physics.P2JS);

        // Inicializa a comunicação via Socket
        this.socket.on('connect', function(){
            console.log('Connectado ao servidor socket');
        });

        this.socket.on('new player', function(data){
            this.player = new Player(this.game, this.socket);
            this.player.create();
        });




        this.cursors = this.input.keyboard.createCursorKeys();
    },

    update: function () {
        this.player.update();
//        if(tccGame.player.getStart()){
//            tccGame.player.update();
//        }
//
//        if (this.cursors.left.isDown)
//        {
//            tccGame.player.setDirection('left');
//        }
//        else if (this.cursors.right.isDown)
//        {
//            tccGame.player.setDirection('right');
//        }else if(this.cursors.up.isDown){
//            tccGame.player.setDirection('up');
//        }else if(this.cursors.down.isDown){
//            tccGame.player.setDirection('down');
//        }else{
//            tccGame.player.setDirection('null');
//        }
//
//        this.socket.emit('move player', {direction: tccGame.player.getDirection()});
//
//        this.socket.on('move player', function(data){
//            var movePlayer = this.playerById(data.id);
//
//            if(!movePlayer){
//                console.log("Player not found: " + data.id );
//                return;
//            }
//
//            movePlayer.setDirection(data.direction);
//        });
    },

    render: function(){
        this.player.render();
    },

    quitGame: function (pointer) {
        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start('MainMenu');
    },

    // Find player by ID
    playerById: function(id){
        var i;
        for (i = 0; i < tccGame.remotePlayer.length; i++) {
            if (tccGame.remotePlayer[i].getId() == id)
                return tccGame.remotePlayer[i];
        };
        return false;
    }

};
