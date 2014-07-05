/**
 * Rota Avatar
 */

module.exports = function(app){

    var enemy = app.controllers.api.enemy;

    app.get('/api/setenemy/:id', enemy.setAvatar);
    app.get('/api/enemy', enemy.list);
    app.get('/api/enemy/:id', enemy.get);
    app.post('/api/enemy', enemy.create);
    app.put('/api/enemy/:id', enemy.update);
    app.delete('/api/enemy/:id', enemy.delete);
};