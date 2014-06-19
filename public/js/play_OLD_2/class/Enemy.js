(function(){
    Enemy = function(game){
        this.game = game;
        this.enemy;
    };

    Enemy.prototype = {
        create: function(){
            this.enemy = this.game.add.sprite(400, 200, 'skeleton', 13);
//            this.enemy.name('enemy 01');

            this.game.physics.enable(this.enemy);

            this.enemy.body.setSize(20, 20, 23, 28);

            this.enemy.debug = true;
            this.enemy.body.immovable = true;

            // Animation
            this.enemy.animations.add('right',     [63,64,65,66,67,68], 10);
            this.enemy.animations.add('up',     [54,55,56,57,58,59], 10);
            this.enemy.animations.add('left',       [45,46,47,48,49,50], 10);
            this.enemy.animations.add('down',    [36,37,38,39,40,41], 10);

            this.enemy.inputEnabled = true;
            this.enemy.input.useHandCursor = true;
            this.enemy.events.onInputDown.add(this.select, this);
        },

        update: function(){

        },

        position: function(){
            if(this.enemy.body.touching.left){
                this.enemy.animations.play('left', 10, true);
            }else if(this.enemy.body.touching.right){
                this.enemy.animations.play('right', 10, true);
            }else if(this.enemy.body.touching.up){
                this.enemy.animations.play('down', 10, true);
            }else if(this.enemy.body.touching.down){
                this.enemy.animations.play('up', 10, true);
            }
        },

        render: function(){
            this.game.debug.body(this.enemy);
//            this.game.debug.bodyInfo(this.enemy, 32, 320);
        },

        select: function(){
            console.log(this.enemy);
        }
    };
})();