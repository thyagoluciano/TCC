(function(){
    Dagger = function(game){
        this.game = game;
        this.dagger;
        this.combat = false;
        this.direction = null;
    };

    Dagger.prototype = {
        create: function(options){
            this.dagger = this.game.add.sprite(0, 0, options.type);
//            this.dagger.debug = true;
            this.game.physics.enable(this.dagger);
            this.dagger.body.setSize(60, 70, 0, 0);
//            this.dagger.body.setSize(20, 20, 0, 0);

            this.dagger.animations.currentFrame.index = 0;

            this.dagger.animations.add('down',     [182,183,184,185,186,187], 10);
            this.dagger.animations.add('left',     [169,170,171,172,173,174], 10);
            this.dagger.animations.add('right',    [195,196,197,198,199,200], 10);
            this.dagger.animations.add('up',       [156,157,158,159,160,161], 10);
            this.dagger.animations.add('foraDeCombat', [0,1,2,3,4,5,6], 10);
        },

        update: function(){

        },

        render: function(){
//            this.game.debug.body(this.dagger);
        },

        atack: function(direction){

            if(this.combat){
                this.dagger.animations.play(direction, 10, true);
            }else{
                this.dagger.animations.play(direction, 10, true);
            }
        },

        setCombat: function(combat, direction){
            this.combat = combat;
            this.atack(direction);
        },

        getWeapon: function(){
            return this.dagger;
        }
    }
})();