(function(){
    Mapa = function(game){
        this.game = game;
        this.map = null;
        this.layer = [];
    };

    Mapa.prototype = {
        create: function(data){

            var map = data.maps;

            // Adiciona o Tilemap e o tileset do mapa
            this.map = this.game.add.tilemap(map.name);
            this.map.addTilesetImage(map.name, 'tiles', map.tileWidth, map.tileHeight, 0, 0, 1);

            for(var i = 0; i < map.layers.length; i++){
                // Cria os Layers do mapa
                this.layer[i] = this.map.createLayer(map.layers[i].name);

//                if(map.layers[i].tiles){
//                    for(var j = 0; j < map.layers[i].tiles.length; j++){
                        // Seta a Layer que tera colisão
//                        this.map.setCollision(map.layers[i].tiles[j], true, map.layers[i].name);
//                        this.map.setCollision(24, true, map.layers[i].name);
                        // Adiciona a Fisica na layer que possuira colisão
//                        this.game.physics.enable(this.layer[i], Phaser.Physics.ARCADE);
//                    }
                    this.map.setCollision(24, true, map.layers[i].name);
                    this.map.setCollision(27, true, map.layers[i].name);
                    // Adiciona a Fisica na layer que possuira colisão
//                    this.game.physics.enable(this.layer[i], Phaser.Physics.ARCADE);

//                    this.map.layers[i].visibility = false;
//                }
                // Chama o metodo de redimensionamento das layers
                this.layer[i].resizeWorld();
            }

            // Liga ou Desliga o Debug;
            this.layer[0].debug = true;
        },

        update: function(){

        },

        render: function(){
            this.game.debug.body(this.layer[0]);
        }
    };
})();