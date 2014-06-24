(function(){
    Itens = function(game, socket){
        this.game = game;
        this.socket = socket.socket;
        this.itens;
    };

    Itens.prototype = {
        create: function(data){

            // Adiciona o over, para auxiliar na batalha.
            this.itens = this.game.add.sprite(data.position.x, data.position.y, 'itens', data.itemId);
            this.itens.id = data.itemId;


            this.game.physics.enable(this.itens, Phaser.Physics.ARCADE);
        },

        update: function(){

        },

        render: function(){

        },

        getId: function(){
            return this.itens.id;
        },

        death: function(remote){
            this.itens.kill();

            if(remote){
                this.socket.emit('deathItem', {id: this.itens.id});
            }
        }

    };
})();