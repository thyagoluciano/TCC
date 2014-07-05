function Player(io, name){
    this.playerModel = io.models.avatar;
    this.id;
    this.name = name;
    this.player;

    this.Calc = require('./Calc');
};

Player.prototype = {
    create: function(id){
        this.id = id;
        this.playerModel.getAvatar(this);
    },

    savePlayer: function(){
        this.playerModel.saveAvatar(this.player);
    },

    setPlayer: function(avatar){
        this.calcAttr(avatar);
    },

    setDirection: function(direction){
        this.player.direction = direction;
    },

    setPosition: function(position){
        this.player.position.x = position.x;
        this.player.position.y = position.y;
    },

    setFrame: function(frame){
        this.player.frame = frame;
    },

    setHp: function(value){
        this.player.attributes.hp = value;
    },

    calcAttr: function(avatar){
        var calc = new this.Calc(avatar);
        this.player = calc.getAttr();
        this.player = this.player.toObject();
        this.player.id = this.id;
        console.log(this.player);
    },

    getId: function(){
        return this.id;
    },

    getName: function(){
        return this.name;
    },

    getPlayer: function(){
        return this.player;
    },

    getDirection: function(){
        return this.player.direction;
    },

    getRoom: function(){
        return this.player.room;
    },

    getHp: function(){
        return this.player.attributes.hp;
    }
};

module.exports = Player;