module.exports = function(app){

    var UserModel = app.models.user;

    var SiteController = {
        index: function(req, res){
            res.render('site/index', { title: 'Express'});
        },
        login: function(req, res){

            // Implementar Rotina de Login
            var email = req.body.usuario.email;

            req.session.usuario = email;

            res.redirect('/jogo');

        },
        logout: function(req, res){
            req.session.destroy();

            res.redirect('/');
        }
    };

    return SiteController;
};