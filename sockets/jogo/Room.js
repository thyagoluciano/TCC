function Room(properties){
    this.properties = properties;
    this.peoples = [];
    this.enemies = [];
    this.itens   = [];
    this.Enemy = require('./Enemy');
    this.Itens = require('./Item');
};

Room.prototype = {
    create: function(io){
        var model = io.models.enemy;
            model.getEnemy(this);

        var itemModel = io.models.itens;
            itemModel.getItens(this);
    },

    setItens: function(itens){
        for(var i = 0; i < itens.length; i++){
            var tmpItem = new this.Itens();
                tmpItem.create(itens[i], i);

            this.itens.push(tmpItem);
        }
    },

    setEnemy: function(enemy){
        var enemies = enemy;

        for(var i = 0; i < this.properties.enemies.length; i++){

            var ctrl = Math.floor(Math.random() * enemies.length);

            var Objeto = new Object();
                Objeto.position = {
                    x: this.properties.enemies[i].x,
                    y: this.properties.enemies[i].y
                }
                Objeto.id = i;
                Objeto.attributes = enemies[ctrl].attributes;
                Objeto.equipment = enemies[ctrl].equipment;
                Objeto.room = enemies[ctrl].room;
                Objeto.name = enemies[ctrl].name;

            var tmpEnemy = new this.Enemy();
                tmpEnemy.create(Objeto);
                tmpEnemy.id = i;

            this.enemies.push(tmpEnemy);
        }
    },

    addPerson: function(person){
        this.peoples.push(person);
    },

    addEnemy: function(enemy){
        this.enemies.push(enemy);
    },

    removePerson: function(person){
        this.peoples.splice(this.peoples.indexOf(person), 1);
    },

    getPeoples: function(){
        return this.peoples;
    },

    getEnemies: function(){
        return this.enemies;
    },

    getItens: function(){
        return this.itens;
    },

    getProperties: function(){
        return this.properties;
    }
}

module.exports = Room;