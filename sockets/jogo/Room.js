function Room(){
    this.peoples = [];
};

Room.prototype = {
    addPerson: function(player){
        this.peoples.push(player);
    },

    getPeople: function(){
        return this.peoples;
    }
};

module.exports = Room;



