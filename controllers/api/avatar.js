module.exports = function(app){

    var AvatarModel = app.models.avatar;

    var AvatarController = {
        setAvatar: function(req, res){
            AvatarModel.setAvatar(req, res);
        },
        list: function(req, res){
            AvatarModel.list(req, res);
        },
        get: function(req, res){
            AvatarModel.get(req, res);
        },
        getByUser: function(req, res){
            AvatarModel.getByUser(req, res);
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