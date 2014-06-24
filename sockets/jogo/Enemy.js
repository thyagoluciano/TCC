function Enemy(){
    this.id;
    this.name;
    this.enemy;

    this.Calc = require('./Calc');
};

Enemy.prototype = {
    create: function(enemy){
        this.calcAttr(enemy);
    },

    calcAttr: function(enemy){
        var calc = new this.Calc(enemy);

        this.enemy = calc.getAttr();
        this.id = enemy._id;
    },

    getId: function(){
        return this.id;
    },

    getName: function(){
        return this.name;
    },

    getEnemy: function(){
        return this.enemy;
    },

    getRoom: function(){
        return this.player.room;
    },

    setHp: function(hp){
        this.enemy.attributes.hp = hp;
    },

    getHp: function(){
        return this.enemy.attributes.hp;
    }
};

module.exports = Enemy;