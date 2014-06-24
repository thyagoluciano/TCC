function Item(){
    this.item = {};
};

Item.prototype = {
    create: function(id){
        this.item.id = id;
    },

    getId: function(){
        return this.item.id;
    }
};

module.exports = Item;



