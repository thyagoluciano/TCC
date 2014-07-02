module.exports = function(app){

    var CategoriaModel = app.models.categoria;

    var CategoriaController = {
        list: function(req, res){
            CategoriaModel.list(req, res);
        },
        get: function(req, res){
            CategoriaModel.get(req, res);
        },
        create: function(req, res){
            CategoriaModel.create(req, res);
        },
        update: function(req, res){
            CategoriaModel.update(req, res);
        },
        delete: function(req, res){
            CategoriaModel.delete(req, res);
        }
    };

    return CategoriaController;
};