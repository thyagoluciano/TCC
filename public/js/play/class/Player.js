var Player = function(games){

    var game = games;
    var player;

    function create(){

        player = game.add.sprite(0, 0, 'hero');
        game.physics.enable(player);

        player.body.setSize(32, 45, 16, 15);
        player.debug = true;

        player.animations.add('down', [130,131,132,133,134,135,136,137], 10);
        player.animations.add('left', [117,118,119,120,121,122,123,124,125], 10);
        player.animations.add('right', [143,144,145,146,147,148,148,150,151], 10);
        player.animations.add('up', [104,105,106,107,108,109,110,111], 10);
        player.animations.add('adown', [182,183,184,185,186,187], 10);
        player.animations.add('aup', [104,105,106,107,108,109,110,111], 10);
        player.animations.add('aleft', [104,105,106,107,108,109,110,111], 10);
        player.animations.add('aright', [104,105,106,107,108,109,110,111], 10);

        player.body.collideWorldBounds = true;

        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(200,200, 130, 130);
        game.camera.focusOnXY(0, 0);

        cursors = game.input.keyboard.createCursorKeys();
    };

    function update(){
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            player.animations.play('left');
            player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown)
        {
            player.animations.play('right');
            player.body.velocity.x = 150;
        }else if(cursors.up.isDown){
            player.animations.play('up');
            player.body.velocity.y = -150;
        }else if(cursors.down.isDown){
            player.animations.play('down');
            player.body.velocity.y = 150;
        }


    };

    function render(){
        game.debug.body(player);
    };

    return {
        create: create,
        update: update,
        render: render
    }
};