(function(){
    Head = function(game){
        this.game = game;
        this.equip;
        this.direction = 'false';
    };

    Head.prototype = {
        create: function(opt){
            // Dagger
            this.equip = this.game.add.sprite(0, 0, opt.name);

            // Fisica
            this.game.physics.enable(this.equip, Phaser.Physics.ARCADE);

            // Adiciona as animações do Sprite
            this.equip.animations.add('left',      Phaser.Animation.generateFrameNames('left', 0, 8, '', 4), 10);
            this.equip.animations.add('right',     Phaser.Animation.generateFrameNames('right', 0, 8, '', 4), 10);
            this.equip.animations.add('up',        Phaser.Animation.generateFrameNames('up', 0, 8, '', 2), 10);
            this.equip.animations.add('down',      Phaser.Animation.generateFrameNames('down', 0, 8, '', 4), 10);

            this.equip.animations.add('dagger_down',     Phaser.Animation.generateFrameNames('dagger_down', 0, 8, '', 4), 10);
            this.equip.animations.add('dagger_left',     Phaser.Animation.generateFrameNames('dagger_left', 0, 8, '', 4), 10);
            this.equip.animations.add('dagger_right',    Phaser.Animation.generateFrameNames('dagger_right', 0, 8, '', 4), 10);
            this.equip.animations.add('dagger_up',       Phaser.Animation.generateFrameNames('dagger_up', 0, 8, '', 4), 10);

            this.equip.animations.add('death',     Phaser.Animation.generateFrameNames('death', 0, 5, '', 4), 10);
        },

        update: function(){

        },

        render: function(){

        },

        battleAnimations: function(direction, aspd){
            this.equip.animations.play('dagger_' + direction, aspd, true);
        },

        stop: function(){
            this.equip.animations.stop()
        }
    };
})();