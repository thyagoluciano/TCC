(function(){
    Itens = function(game, socket){
        this.game = game;
        this.socket = socket.socket;
        this.item;
        this.properties;
    };

    Itens.prototype = {
        create: function(data, tmpId){
            // Adiciona o over, para auxiliar na batalha.
            this.item = this.game.add.sprite(data.position.x, data.position.y, 'itens', tmpId);
            this.item.id = tmpId;
            this.item.properties = data.item;
            this.game.physics.enable(this.item, Phaser.Physics.ARCADE);
        },

        update: function(){

        },

        render: function(){

        },

        getId: function(){
            return this.item.id;
        },

        death: function(remote){
            this.item.kill();

            if(remote){
                this.socket.emit('deathItem', {id: this.item.id});
            }
        }

    };
})();