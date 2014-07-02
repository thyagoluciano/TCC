
module.exports = function(app){

    var fs = require('fs');

    var produto = app.controllers.api.produto;

    app.get('/api/produto',           produto.list);    // GET      [Busca todas as produto cadastradas]
    app.get('/api/produto/:id',       produto.get);     // GET      [Busca produto pelo ID]
    app.post('/api/produto',          produto.create);  // POST     [Insere uma nova produto no BD]
    app.put('/api/produto/:id',       produto.update);  // PUT      [Atualiza uma produto no BD]
    app.delete('/api/produto/:id',    produto.delete);  // DELETE   [Delera uma produto do BD]

};
