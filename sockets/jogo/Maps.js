function Maps(io){
    //the cached instance
    var instance;

    this.Room = require('./Room');
    this.io = io;
    this.model;

    // Array de maps
    this.maps = [];

    // rewrite the constructor
    Maps = function Maps(){
        return instance;
    }

    //carry over the prototype properties
    Maps.prototype = this;

    //the instance
    instance = new Maps();

    //reset the constructor pointer
    instance.constructor = Maps;

    //return the instance
    return instance;
};

Maps.prototype = {
    create: function(){
        this.model = this.io.models.map;
        this.model.getMaps(this);
    },

    setMaps: function(data){
        for(var i = 0; i < data.length; i++){
            if(!this.maps[data[i].name]){
                this.maps[data[i].name] = new this.Room(data[i]);
                this.maps[data[i].name].create(this.io);
            }
        };
    },
    getRoom: function(name){
        return this.maps[name];
    }
}

module.exports = Maps;

