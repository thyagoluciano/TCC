(function(){
    Itens = function(game){
        this.game = game;
        this.itens;
    };

    Itens.prototype = {
        create: function(randIten){
            // Adiciona o over, para auxiliar na batalha.
            this.itens = this.game.add.sprite(300, 100, 'itens', randIten);

            this.game.physics.enable(this.itens, Phaser.Physics.ARCADE);
        },

        update: function(){

        },

        render: function(){

        }
    };
})();