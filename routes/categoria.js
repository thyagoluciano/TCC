
module.exports = function(app){

    var categoria = app.controllers.api.categoria;

    app.get('/api/categoria',           categoria.list);    // GET      [Busca todas as categorias cadastradas]
    app.get('/api/categoria/:id',       categoria.get);     // GET      [Busca Categoria pelo ID]
    app.post('/api/categoria',          categoria.create);  // POST     [Insere uma nova Categoria no BD]
    app.put('/api/categoria/:id',       categoria.update);  // PUT      [Atualiza uma categoria no BD]
    app.delete('/api/categoria/:id',    categoria.delete);  // DELETE   [Delera uma categoria do BD]
};
