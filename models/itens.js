'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var ItensSchema  = new Schema({
    name: {type: String},
    position: {type: Number},
    type: {type: String},
    model: {type: String},
    value: {type: Number},
    price: {type: Number},
    hp: {type: Number},
    atk: {type: Number}
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
