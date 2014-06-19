(function(){
    Path = function(game, map){
        this.game = game;
        this.map = map;

        this.marker;
        this.walkables;
        this.pathfinder;
        this.blocked;
    };

    Path.prototype = {
        create: function(){
            this.walkables = [0];

            var pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
//            this.pathfinder.setGrid(this.map.layers[2].data, this.walkables);

            // Cria Marcador
            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0x000000, 1);
            this.marker.drawRect(0, 0, 32, 32);
        },

        update: function(){
            // Atualiza posição do marcador de acordo com posição do mouse
            this.marker.x = this.map.layer.getTileX(this.game.input.activePointer.worldX) * 32;
            this.marker.y = this.map.layer.getTileY(this.game.input.activePointer.worldY) * 32;

            if(this.game.input.mousePointer.isDown){
                this.blocked = true;
                this.findPathTo(this.map.layer.getTileX(this.marker.x), this.map.layer.getTileY(this.marker.y));
            }
            // FIM
        },

        findPathTo: function(tilex, tiley){
            console.log(tilex, tiley);
        }
    };
})();