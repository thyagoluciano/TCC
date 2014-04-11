var mongoose    = require('mongoose');
    mongoose.connect("mongodb://localhost/TCC");

var db = mongoose.connection;

    db.on("error", function(err){
        console.log("Erro durante conexão", err);
    });

    db.once("open", function(){
        console.log("Conexão realizada com o Banco");
    });


exports.mongoose = mongoose;