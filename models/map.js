'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var MapSchema  = new Schema({
    name: {type: String, require: true, unique: true},
    tileWidth: {type: Number, require: true},
    tileHeight: {type: Number, require: true},
    tilesheet: {},
    atlas: {},
    layers: {},
    enemies: {}
});

var Map        = mongoose.model("Map", MapSchema);

exports.getMaps = function(Maps){
    var tmpMaps = Maps;
    var callback = function(){
        return function(err, data){
            if(err){
                console.log(err);
            }else{
                tmpMaps.setMaps(data);
            }
        }
    };
    Map.find({}, callback());
};

exports.list = function(req, res){
    Map.find({}).exec(function(err, maps){
        if(err){
            console.log("Error: ", err);
        }else{
            res.json(maps);
        }
    });
};

exports.getByName = function(req, res){
    var name = req.params.name;

    Map
        .findOne({name: name}).exec(function(err, maps){
            if(err){
                console.log(err);
                res.json(err);
            }else{
                res.json(maps);
            }
        });
};

exports.get = function(req, res){
    var id = req.params.id;

    Map
        .findOne({_id: id}).exec(function(err, maps){
            if(err){
                console.log(err);
                res.json(err);
            }else{
                res.json(maps);
            }
        });
};

exports.create = function(req, res){
    var data = req.body;

    var dados = {
        name:       data.name,
        tileWidth:  data.tileWidth,
        tileHeight: data.tileHeight,
        tilesheet:  data.tilesheet,
        atlas:      data.atlas,
        layers:     data.layers,
        enemies:    data.enemies
    };

    var map = new Map(dados);

    map.save(function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

/**
 * Atualiza um Usuário no BD
 * @param req
 * @param res
 */
exports.update = function(req, res){
    var id = req.params.id;
    var data = req.body;

    Map.update({_id: id}, data, function(err, data){
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

    Map.remove({_id: id}, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}