/**
 * Rota Avatar
 */

module.exports = function(app){

    var avatar = app.controllers.api.avatar;

    app.get('/api/setavatar/:id', avatar.setAvatar);
    app.get('/api/avatar', avatar.list);
    app.get('/api/avatar/:id', avatar.get);
    app.get('/api/avatarbyuser/:id', avatar.getByUser);
    app.post('/api/avatar', avatar.create);
    app.put('/api/avatar/:id', avatar.update);
    app.delete('/api/avatar/:id', avatar.delete);
};