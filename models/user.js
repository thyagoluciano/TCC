'use strict'

var connection = require('./connection');

var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

var UserSchema  = new Schema({
    name: {type: String, default: ''},
    email: {type: String, default: '', unique: true},
    password: {type: String, default: ''},
    facebook: {},
    twitter: {},
    github: {},
    google: {},
    linkedin: {}
});

var User        = mongoose.model("User", UserSchema);

/**
 * Busca todos os Usuários do BD
 * @param req
 * @param res
 */
exports.list = function(req, res){
    User.find().exec(function(err, users){
        if(err){
            console.log("Error: ", err);
        }else{
            res.json(users);
        }
    });
};

exports.login = function(req, res){
    var email = req.params.email;
    var passw = req.params.password;

    User.findOne({email: email, password: passw}).exec(function(err, users){
        if(err){
            console.log("Error: ", err);
        }else{
            req.session.usuario = users;
            res.json(users);
        }
    });
};

/**
 * Busca Usuário pelo ID
 * @param req
 * @param res
 */
exports.get = function(req, res){
    var id = req.params.id;

    User
        .findOne({_id: id}).exec(function(err, users){
            if(err){
                console.log(err);
                res.json(err);
            }else{
                res.json(users);
            }
        });
};

/**
 * Insere um Usuário no BD
 * @param req
 * @param res
 */
exports.create = function(req, res){
    var data = req.body;

    var dados = {
        name:       data.name,
        email:      data.email,
        password:   data.password
    };

    var user = new User(dados);

    user.save(function(err, data){
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

    User.update({_id: id}, data, function(err, data){
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

    User.remove({_id: id}, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
}