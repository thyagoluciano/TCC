module.exports = function(app){

    var EnemyModel = app.models.enemy;

    var EnemyController = {
        setAvatar: function(req, res){
            EnemyModel.setAvatar(req, res);
        },
        list: function(req, res){
            EnemyModel.list(req, res);
        },
        get: function(req, res){
            EnemyModel.get(req, res);
        },
        getByUser: function(req, res){
            EnemyModel.getByUser(req, res);
        },
        create: function(req, res){
            EnemyModel.create(req, res);
        },
        update: function(req, res){
            EnemyModel.update(req, res);
        },
        delete: function(req, res){
            EnemyModel.delete(req, res);
        }
    };

    return EnemyController;
};