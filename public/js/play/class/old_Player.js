tccGame.Player = function(game, socket){

    this.socket         = socket;
    this.socket.player  = this;

    this.game = game;

    this.player;
    this.cursors;
    this.start = false;
    this.direction = null;
    this.id;
}

tccGame.Player.prototype = {

    create: function(data){
        this.id = data.id;
        this.player = this.game.add.sprite(10, 10, 'hero');
        this.game.physics.enable(this.player);

        this.player.body.setSize(32, 45, -15, -15);
        this.player.debug = true;

        this.player.animations.add('down', [130,131,132,133,134,135,136,137], 10);
        this.player.animations.add('left', [117,118,119,120,121,122,123,124,125], 10);
        this.player.animations.add('right', [143,144,145,146,147,148,148,150,151], 10);
        this.player.animations.add('up', [104,105,106,107,108,109,110,111], 10);
        this.player.animations.add('adown', [182,183,184,185,186,187], 10);
        this.player.animations.add('aup', [104,105,106,107,108,109,110,111], 10);
        this.player.animations.add('aleft', [104,105,106,107,108,109,110,111], 10);
        this.player.animations.add('aright', [104,105,106,107,108,109,110,111], 10);

        this.player.body.collideWorldBounds = true;

        this.game.camera.follow(this.player);
        this.game.camera.deadzone = new Phaser.Rectangle(200,200, 130, 130);
        this.game.camera.focusOnXY(0, 0);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.start = true;
    },

    update: function(){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (this.direction == 'left')
        {
            this.player.animations.play('left');
            this.player.body.velocity.x = -150;
        }
        else if (this.direction == 'right')
        {
            this.player.animations.play('right');
            this.player.body.velocity.x = 150;
        }else if(this.direction == 'up'){
            this.player.animations.play('up');
            this.player.body.velocity.y = -150;
        }else if(this.direction == 'down'){
            this.player.animations.play('down');
            this.player.body.velocity.y = 150;
        }
    },

    setDirection: function(direction){
        this.direction = direction;
    },

    getDirection: function(){
        return this.direction;
    },

    getStart: function(){
        return this.start;
    }
};