'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var UploadSchema  = new Schema({
    name: {type: String, unique: true},
    type: {type: String},
    file: {type: String}
});

var Upload        = mongoose.model("Upload", UploadSchema);

/**
 * Busca todas as Categorias
 * @param req
 * @param res
 */
exports.list = function(req, res){
    Upload.find({}).exec(function(err, data){
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

exports.getByType = function(req, res){
    var id = req.params.id;

    Upload.find({type: id}).exec(function(err, data){
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

exports.get = function(req, res){
    var id = req.params.id;

    Upload
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
 * Insere uma nova categoria no Banco de Dados
 * @param req
 * @param res
 */
exports.create = function(req, res){
    var data = req.body;

    var dados = {
        name:       data.name,
        file:       data.file,
        atlas:      data.atlas,
        type:       data.type
    };

    var upload = new Upload(dados);

    upload.save(function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

exports.update = function(req, res){
    var id = req.params.id;
    var data = req.body;

    Upload.update({_id: id}, data, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

exports.delete = function(req, res){
    var id = req.params.id;

    Upload.remove({_id: id}, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}