'use strict'

var connection = require('./connection');
var xml2js = require('xml2js');
var pagseguro = require('pagseguro');

var pag = new pagseguro('thyagoluciano@gmail.com', 'E4C115D9E959499BB524AAD7EA79255B');


var mongoose    = connection.mongoose,
    Schema      = mongoose.Schema;

// Schema Avatar
var PedidoSchema  = new Schema({
    user: {},
    itens: {},
    pagseguro: {},
    status: {type: String},
    total: {}
});

var Pedido          = mongoose.model("Pedido", PedidoSchema);


exports.get = function(req, res){
    var id = req.params.id;

    Pedido
        .findOne({_id: id}).exec(function(err, avatar){
            if(err){
                res.json(err);
            }else{
                res.json(avatar);
            }
        });
};

exports.list = function(req, res){
    Pedido.find({}).exec(function(err, data){
        if(err){
            console.log("Error: ", err);
        }else{
            res.json(data);
        }
    });
};

exports.update = function(req, res){
    var id = req.params.id;
    var data = req.body;

    Pedido.update({_id: id}, data, function(err, data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
};

exports.pagar = function(req, res){

//    console.log(req.body);
//    console.log(req.session.usuario);

    var session  = req.session.usuario;
    var carrinho = req.body.carrinho;


//    console.log(session);
//    console.log(carrinho);

    pag.currency('BRL');
    pag.reference(session._id);

    for(var i = 0; i < carrinho.length; i++){
        var valor = carrinho[i].price.real.replace(/,/gi, ".");
//            valor = parseFloat(valor);
//            valor = valor.toFixed(2);

        //Adicionando itens
        pag.addItem({
            id: (i + 1),
            description: carrinho[i].name,
            amount: valor,
            quantity: carrinho[i].qtd
        });
    }

    console.log(pag.getItem());

    pag.buyer({
        name: session.name,
        email: session.email
    });



    //Configuranto URLs de retorno e de notificação (Opcional)
    //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
//    pag.setRedirectURL("http://www.lojamodelo.com.br/retorno");
//    pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao");

    //Enviando o xml ao pagseguro
    pag.send(function(err, data) {
        var parser = new xml2js.Parser();

        parser.addListener('end', function(result) {

            var dados = {
                user: session,
                itens: carrinho,
                pagseguro: result,
                status: 'Aguardando Pagamento'
            }

            var pedido = new Pedido(dados);

            pedido.save(function(err, data){
                if(err){
                    res.json(err);
                }else{
                    res.json(data);
                }
            });

            res.json(result);

        });

        if (err) {
            parser.parseString(err);
        }else{
            parser.parseString(data);
        }
    });
};

