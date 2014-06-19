(function(){
    Npc = function(game){
        this.game = game;
        this.npc = null;
    };

    Npc.prototype = {
        create: function( data ){
            this.npc = this.game.add.sprite(data.position.x, data.position.y, 'npc', data.tile);
            this.npc.name = data.name;

            this.game.physics.enable(this.npc, Phaser.Physics.ARCADE);

            this.npc.inputEnabled = true;
            this.npc.input.pixelPerfect = true;
            this.npc.input.useHandCursor = true;
            this.npc.events.onInputDown.add(this.select, this);

            this.npc.body.immovable = true;
        },

        update: function(){

        },

        render: function(){
            this.game.debug.body(this.npc);
        },

        select: function(){
            console.log(this.npc.name);
        },

        getNpc: function(){
            return this.npc;
        }
    };
})();