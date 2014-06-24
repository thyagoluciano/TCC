function Item(){
    this.item;
    this.itemId;
};

Item.prototype = {
    create: function(item, itemId){
        this.item = item;
        this.itemId = itemId;
    },

    getId: function(){
        return this.itemId;
    },

    getName: function(){
        return this.item.name;
    },

    getPosition: function(){
        return this.item.position;
    },

    getItem: function(){
        return this.item;
    }

};

module.exports = Item;