var xml2js = require('xml2js');
var pagseguro = require('pagseguro');
//Inicializar a função com o e-mail e token
var pag, pagseguro;
pagseguro = require('pagseguro');
pag = new pagseguro('thyagoluciano@gmail.com', 'E4C115D9E959499BB524AAD7EA79255B');

//Configurando a moeda e a ferência do pedido
pag.currency('BRL');
pag.reference('12345');

//Adicionando itens
//pag.addItem({
//    id: 1,
//    description: 'Descrição do primeiro produto',
//    amount: "4230.00",
//    quantity: 3
//});

pag.addItem({
    id: 1,
    description: 'melancia',
    amount: '0.25',
    quantity: 1
})

pag.addItem({
    id: 2,
    description: 'melancia 02',
    amount: '0.85',
    quantity: 1
})

//Configurando as informações do comprador
pag.buyer({
    name: 'José Comprador',
    email: 'comprador@uol.com.br'
});

//Configurando a entrega do pedido


//Configuranto URLs de retorno e de notificação (Opcional)
//ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
pag.setRedirectURL("http://www.lojamodelo.com.br/retorno");
pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao");

//Enviando o xml ao pagseguro
pag.send(function(err, res) {
    if (err) {
        console.log(err);
    }

    console.log(res);

    var parser = new xml2js.Parser();

    parser.addListener('end', function(result) {
        console.dir(result.checkout.code[0]);
        location.href = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' + result.checkout.code[0];
        //res.redirect('https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' + body.checkout.code);
    });

    parser.parseString(res);
});

