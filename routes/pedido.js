module.exports = function(app){

    var pedido = app.controllers.api.pagseguro;

    app.get('/api/pedido',           pedido.list);    // GET      [Busca todas as produto cadastradas]
    app.get('/api/pedido/:id',       pedido.get);     // GET      [Busca produto pelo ID]
//    app.post('/api/pedido',          pedido.create);  // POST     [Insere uma nova produto no BD]
    app.put('/api/pedido/:id',       pedido.update);  // PUT      [Atualiza uma produto no BD]
//    app.delete('/api/pedido/:id',    pedido.delete);  // DELETE   [Delera uma produto do BD]

};

