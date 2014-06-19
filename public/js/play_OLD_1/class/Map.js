(function(){
    'use strict';

    Map = function(game){
        this.game = game;
        this.map;
        this.layer;
    };

    Map.prototype = {

        create: function(){
            this.map = this.game.add.tilemap('praia');
            this.map.addTilesetImage('praia', 'tiles', 32, 32, 0, 0, 1);

            this.map.setCollisionBetween(259,260, true, 'Colisao');
            this.map.setCollision(279, true, 'Colisao');
            this.map.setCollision(280, true, 'Colisao');

            this.layer = this.map.createLayer('Praia');
            this.layer = this.map.createLayer('Colisao');

            this.layer.resizeWorld();
            this.layer.debug = true;
        },

        update: function(){

        },

        render: function(){
            this.game.debug.body(this.layer);
        }
    };
})();