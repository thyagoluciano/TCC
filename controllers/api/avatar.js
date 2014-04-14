module.exports = function(app){

    var AvatarModel = app.models.avatar;

    var AvatarController = {
        list: function(req, res){
            AvatarModel.list(req, res);
        },
        get: function(req, res){
            AvatarModel.get(req, res);
        },
        create: function(req, res){
            AvatarModel.create(req, res);
        },
        update: function(req, res){
            AvatarModel.update(req, res);
        },
        delete: function(req, res){
            AvatarModel.delete(req, res);
        }
    };

    return AvatarController;
};