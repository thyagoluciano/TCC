'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var ItensSchema  = new Schema({
    name: {type: String, unique: true},
    type: {},
    tiled: {},
    tiledPosition: {type: Number},
    equipAttr: {
        atk: {type: Number},
        def: {type: Number},
        hp: {type: Number},
        str: {type: Number},
        agi: {type: Number},
        vit: {type: Number},
        int: {type: Number},
        dex: {type: Number},
        luk: {type: Number}
    },
    price: {
        real: {type: String},
        virtual: {type: String}
    },
    spriteSheet: {
        type: {},
        atlas: {},
        tilesheet: {}
    },
    description: {type: String}
});

var Itens          = mongoose.model("Itens", ItensSchema);

exports.getItens = function(room){

    var tmpRoom = room;

    var callback = function(){
        return function(err, data){
            if(err){
                console.log(err);
            }else{
                tmpRoom.setItens(data);
            }
        }
    };

    Itens.find({}, callback());
};

/**
 * Busca todas as Categorias
 * @param req
 * @param res
 */
exports.list = function(req, res){
    Itens.find({}).exec(function(err, data){
        if(err){
            console.log("Error: ", err);
        }else{
            res.json(data);
        }
    });
};

exports.get = function(req, res){
    var id = req.params.id;

    Itens
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
        name:           data.name,
        equipAttr:      data.equipAttr,
        type:           data.categoria,
        tiled:          data.tiled,
        tiledPosition:  data.tiledPosition,
        price:          data.price,
        spriteSheet: {
            type: data.typeEquip,
            atlas: data.atlas,
            tilesheet: data.tilesheet
        },
        description: data.description
    };


    var itens = new Itens(dados);

    itens.save(function(err, data){
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

    var dados = {
        name:           data.name,
        equipAttr:      data.equipAttr,
        type:           data.categoria,
        tiled:          data.tiled,
        tiledPosition:  data.tiledPosition,
        price:          data.price,
        spriteSheet: {
            type: data.typeEquip,
            atlas: data.atlas,
            tilesheet: data.tilesheet
        },
        description: data.description
    };

    Itens.update({_id: id}, dados, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

exports.delete = function(req, res){
    var id = req.params.id;

    Itens.remove({_id: id}, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}
