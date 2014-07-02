'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

// Schema Avatar
var AvatarSchema  = new Schema({
    name: {type: String, unique: true},
    gender: {type: String, default: 'M'},
    sprite: {type: Number},
    attributes: {
        str: {type: Number, min: 0,     max: 99,    require: true},
        agi: {type: Number, min: 0,     max: 99,    require: true},
        vit: {type: Number, min: 0,     max: 99,    require: true},
        int: {type: Number, min: 0,     max: 99,    require: true},
        dex: {type: Number, min: 0,     max: 99,    require: true},
        luk: {type: Number, min: 0,     max: 99,    require: true},
        atk: {type: Number, min: 0,     max: 99,    require: true},
        def: {type: Number, min: 0,     max: 99,    require: true},
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
    storage:{},
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

var Avatar          = mongoose.model("Avatar", AvatarSchema);

exports.saveAvatar = function(dados){

    delete dados._id;
    delete dados.id;

    dados.position.x = Math.round(dados.position.x);
    dados.position.y = Math.round(dados.position.y)


    Avatar.update({name: dados.name}, dados, function(err, data){
        console.log(data);
    });
};

exports.getAvatar = function(Player){
    var tmpPlayer = Player;

    var callback = function(){
        return function(err, data){
            if(err){
                console.log(err);
            }else{
                tmpPlayer.setPlayer(data);
            }
        }
    };

    Avatar.findOne({name: tmpPlayer.getName()}, callback());
};

exports.setAvatar = function(req, res){
    var id = req.params.id;

    Avatar
        .findOne({_id: id}).exec(function(err, avatar){
            if(err){
                console.log(err);
                res.json(err);
            }else{
                req.session.usuario.avatar = avatar;
                res.json(req.session.usuario);
            }
        });
};
/**
 * Busca todos os Avatares
 * @param req
 * @param res
 */
exports.list = function(req, res){
    Avatar.find().exec(function(err, avatar){
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

    Avatar
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

    Avatar.find({user: id}).exec(function(err, avatar){
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
        data.attributes.level = 1;

    var dados = {
        name:       data.name,
        gender:     data.gender,
        attributes: data.attributes,
        sprite: 1,
        position: {
            px: 250,
            py: 80
        },
        user:       data.user
    };

    var avatar = new Avatar(dados);

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

    Avatar.update({_id: id}, data, function(err, data){
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

    Avatar.remove({_id: id}, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}
