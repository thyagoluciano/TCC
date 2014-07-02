
module.exports = function(app){

    var map = app.controllers.api.map;

    app.get('/api/map', map.list);
    app.get('/api/map/:id',       map.get);
    app.get('/api/map/:name', map.getByName);        // Lista Usuário pelo ID
    app.post('/api/map', map.create);        // Insere um Usuário no BD
    app.put('/api/map/:id', map.update);     // Atualiza um Usuário no BD
    app.delete('/api/map/:id', map.delete);  // Deleta um Usuário no BD
};
