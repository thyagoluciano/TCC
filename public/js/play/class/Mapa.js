(function(){
    Mapa = function(game){
        this.game = game;
        this.map = null;
        this.layer = [];
    };

    Mapa.prototype = {
        create: function(){
            // Adiciona o Tilemap e o tileset do mapa
            this.map = this.game.add.tilemap('praia');
            this.map.addTilesetImage('Praia', 'tiles', 32, 32, 0, 0, 1);


            // Seta a Layer que tera colisão
            this.map.setCollision(24, true, 'Colisao');
            this.map.layers[3].visibility = false;

            // Cria os Layers do mapa
            this.layer[0] = this.map.createLayer('Colisao');
            this.layer[1] = this.map.createLayer('Praia');
            this.layer[2] = this.map.createLayer('Enfeites');
            this.layer[3] = this.map.createLayer('Montanhas');


            // Adiciona a Fisica na layer que possuira colisão
            this.game.physics.enable(this.layer[0], Phaser.Physics.ARCADE);

            // Chama o metodo de redimensionamento das layers
            this.layer[0].resizeWorld();
            this.layer[1].resizeWorld();
            this.layer[2].resizeWorld();
            this.layer[3].resizeWorld();

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