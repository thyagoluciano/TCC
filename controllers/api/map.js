module.exports = function(app){

    var MapModel = app.models.map;

    var MapController = {
        list: function(req, res){
            MapModel.list(req, res);
        },
        get: function(req, res){
            MapModel.get(req, res);
        },
        getByName: function(req, res){
            MapModel.getByName(req, res);
        },
        create: function(req, res){
            MapModel.create(req, res);
        },
        update: function(req, res){
            MapModel.update(req, res);
        },
        delete: function(req, res){
            MapModel.delete(req, res);
        }
    };

    return MapController;
};