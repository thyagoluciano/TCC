module.exports = function(app){

    var pagseguro = app.controllers.api.pagseguro;

    app.post('/api/pagar', pagseguro.pagar);
};