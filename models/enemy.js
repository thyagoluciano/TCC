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
    tilesheet: {},
    atlas: {}
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

exports.saveEnemy = function(dados){

    delete dados._id;
    delete dados.id;

    dados.position.x = Math.round(dados.position.x);
    dados.position.y = Math.round(dados.position.y)


    Enemy.update({name: dados.name}, dados, function(err, data){
        console.log(data);
    });
};

/**
 * Busca todos os Avatares
 * @param req
 * @param res
 */
exports.list = function(req, res){
    Enemy.find().exec(function(err, avatar){
        if(err){
            console.log("Error: ", err);
        }else{
            res.json(avatar);
        }
    });
};

/**
 * Busca Avatar pelo ID
 * @param req
 * @param res
 */
exports.get = function(req, res){
    var id = req.params.id;

    Enemy
        .findOne({_id: id}).exec(function(err, avatar){
            if(err){
                console.log(err);
                res.json(err);
            }else{
                res.json(avatar);
            }
        });
};

exports.getByUser = function(req, res){
    var id = req.params.id;

    Enemy.find({user: id}).exec(function(err, avatar){
        if(err){
            res.json(err);
        }else{
            res.json(avatar);
        }
    });
};
/**
 * Insere um Avatar no BD
 * @param req
 * @param res
 */
exports.create = function(req, res){
    var data = req.body;

    console.log(data);

    var dados = {
        name:       data.name,
        room: data.room.name,
        attributes: data.attributes,
        position: {
            x: data.x,
            y: data.y
        },
        atlas: data.atlas,
        tilesheet: data.tilesheet
    };

    var avatar = new Enemy(dados);

    avatar.save(function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

/**
 * Atualiza um Avatar no BD
 * @param req
 * @param res
 */
exports.update = function(req, res){
    var id = req.params.id;
    var data = req.body;

    var dados = {
        name:       data.name,
        room: data.room.name,
        attributes: data.attributes,
        position: {
            x: data.x,
            y: data.y
        },
        atlas: data.atlas,
        tilesheet: data.tilesheet
    };

    Enemy.update({_id: id}, dados, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

/**
 * Deleta um Usuário no BD
 * @param req
 * @param res
 */
exports.delete = function(req, res){
    var id = req.params.id;

    Enemy.remove({_id: id}, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}
