'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var CategoriaSchema  = new Schema({
    name: {type: String, unique: true}
});

var Categoria        = mongoose.model("Categoria", CategoriaSchema);

/**
 * Busca todas as Categorias
 * @param req
 * @param res
 */
exports.list = function(req, res){
    Categoria.find({}).exec(function(err, data){
        if(err){
            console.log("Error: ", err);
        }else{
            res.json(data);
        }
    });
};

exports.get = function(req, res){
    var id = req.params.id;

    Categoria
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
        name:       data.name
    };

    var categoria = new Categoria(dados);

    categoria.save(function(err, data){
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

    Categoria.update({_id: id}, data, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

exports.delete = function(req, res){
    var id = req.params.id;

    Categoria.remove({_id: id}, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}