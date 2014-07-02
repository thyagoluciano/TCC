module.exports = function(app){

    var UserModel = app.models.user;
    var title = 'TCC FPU - Sistema Administrativo MMORPG';

    var AdminController = {
        index: function(req, res){
            res.render('admin/index', { title: title});
        },
        manager: function(req, res){
            res.render('admin/manager', { title: title});
        },

        angular: function(req, res){
            var diretorio   = req.params.diretorio;
            var name        = req.params.name;
            res.render(diretorio + '/' + name);
        },

        angular1: function(req, res){
            var diretorio       = req.params.diretorio;
            var diretorio1      = req.params.diretorio1;
            var name            = req.params.name;
            res.render(diretorio + '/' + diretorio1 + '/' + name);
        }
    };

    return AdminController;
};
