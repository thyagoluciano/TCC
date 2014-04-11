'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var AvatarSchema  = new Schema({
    name: {type: String},
    gender: {type: String, default: 'M'},
    for: {type: Number, min: 0, max: 99, require: true},
    agi: {type: Number, min: 0, max: 99, require: true},
    vit: {type: Number, min: 0, max: 99, require: true},
    int: {type: Number, min: 0, max: 99, require: true},
    des: {type: Number, min: 0, max: 99, require: true},
    sor: {type: Number, min: 0, max: 99, require: true},
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

var Avatar          = mongoose.model("Avatar", AvatarSchema);

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

/**
 * Insere um Avatar no BD
 * @param req
 * @param res
 */
exports.create = function(req, res){
    var data = req.body;

    var dados = {
        name:       data.name,
        gender:     data.gender,
        for:        data.for,
        agi:        data.agi,
        vit:        data.vit,
        int:        data.int,
        des:        data.des,
        sor:        data.sor,
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
