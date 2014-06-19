(function(){
    Map = function(game){
        this.game = game;
        this.map = null;
        this.layer = null;
    };

    Map.prototype = {
        create: function(data){

            this.game.stage.background = '#000000';


            this.map = this.game.add.tilemap(data.name);


            for(var i = 0; i < data.tilesheet.length; i++){
                this.map.addTilesetImage(data.name, data.tilesheet[i].name, data.tileWidth, data.tileHeight, 0, 0, 1 );
            }

            this.map.setCollision(24, true, 'Colisao');

            for(var j = 0; j < data.layers.length; j++){
                this.layer = this.map.createLayer(data.layers[j].name);
            }

            this.layer.resizeWorld();
            this.layer.debug = true;
        },

        update: function(){
            console.log('Update');
        },

        render: function(){
            this.game.debug.body(this.layer);
        },

        getLayer: function(){
            return this.layer;
        }
    };
})();