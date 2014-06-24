'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var EnemySchema  = new Schema({
    name: {type: String, unique: true},
    gender: {type: String, default: 'M'},
    room: {type: String},
    sprite: {type: Number},
    attributes: {
        str: {type: Number, min: 0,     max: 99,    require: true},
        agi: {type: Number, min: 0,     max: 99,    require: true},
        vit: {type: Number, min: 0,     max: 99,    require: true},
        int: {type: Number, min: 0,     max: 99,    require: true},
        dex: {type: Number, min: 0,     max: 99,    require: true},
        luk: {type: Number, min: 0,     max: 99,    require: true},
        aspd: {type: Number,  min: 0,   max: 99,  require: true},
        def: {type: Number,  min: 0,   max: 99,  require: true},
        atk: {type: Number,  min: 0,   max: 99,  require: true},
        hp: {type: Number,  min: 0,     max: 9999,  require: true},
        level: {type: Number,  min: 0,   max: 99,  require: true}
    },
    equipment: {
        weapon: {},
        torso: {},
        legs: {},
        head: {},
        hands: {},
        feet: {},
        belt: {}
    },
    position: {
        x: {type: Number, require: true},
        y: {type: Number, require: true}
    },
    storage:{}
});

var Enemy          = mongoose.model("Enemy", EnemySchema);

exports.getEnemy = function(room){

    var tmpRoom = room;

    var callback = function(){
        return function(err, data){
            if(err){
                console.log(err);
            }else{
                tmpRoom.setEnemy(data);
            }
        }
    };

    Enemy.find({room: tmpRoom.properties.name}, callback());
};
