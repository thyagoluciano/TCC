(function(){
    Dagger = function(game){
        this.game = game;
        this.dagger;
        this.direction = 'false';
    };

    Dagger.prototype = {
        create: function(){
            // Dagger
            this.dagger = this.game.add.sprite(0, 0, 'dagger');

            // Fisica
            this.game.physics.enable(this.dagger, Phaser.Physics.ARCADE);

            // Animations
            this.dagger.animations.add('dagger_down',     Phaser.Animation.generateFrameNames('dagger_down', 0, 8, '', 4), 10);
            this.dagger.animations.add('dagger_left',     Phaser.Animation.generateFrameNames('dagger_left', 0, 8, '', 4), 10);
            this.dagger.animations.add('dagger_right',    Phaser.Animation.generateFrameNames('dagger_right', 0, 8, '', 4), 10);
            this.dagger.animations.add('dagger_up',       Phaser.Animation.generateFrameNames('dagger_up', 0, 8, '', 4), 10);
            this.dagger.animations.add('dagger_false', [0], 10);
        },

        update: function(){

        },

        render: function(){

        },

        battleAnimations: function(direction, aspd){
            this.dagger.animations.play('dagger_' + direction, aspd, true);
        },

        stop: function(){
            this.dagger.animations.play('dagger_false', 10, true);
        }
    };
})();