
module.exports = function(app){

    var user = app.controllers.api.user;

    app.get('/api/users', user.list);
    app.get('/api/users/:id', user.get);        // Lista Usuário pelo ID
    app.get('/api/users/:email/:password', user.login);
    app.post('/api/users', user.create);        // Insere um Usuário no BD
    app.put('/api/users/:id', user.update);     // Atualiza um Usuário no BD
    app.delete('/api/users/:id', user.delete);  // Deleta um Usuário no BD

};
