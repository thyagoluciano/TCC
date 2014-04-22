module.exports = function(app){

    var UserModel = app.models.user;

    var UserController = {
        list: function(req, res){
            UserModel.list(req, res);
        },
        get: function(req, res){
            UserModel.get(req, res);
        },
        getSession: function(req, res){
            UserModel.getUserSession(req, res);
        },
        login: function(req, res){
            UserModel.login(req, res);
        },
        logout: function(req, res){
            UserModel.logout(req, res);
        },
        create: function(req, res){
            UserModel.create(req, res);
        },
        update: function(req, res){
            UserModel.update(req, res);
        },
        delete: function(req, res){
            UserModel.delete(req, res);
        }
    };

    return UserController;
};