function Room(){
    this.peoples = [];
    this.enemies = [];
};

Room.prototype = {
    addPerson: function(player){
        this.peoples.push(player);
    },

    getPeople: function(){
        return this.peoples;
    },

    addEnemy: function(enemy){
        this.enemies.push(enemy);
    },

    getEnemy: function(){
        return this.enemies;
    }
};

module.exports = Room;



