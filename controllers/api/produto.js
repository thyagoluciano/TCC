module.exports = function(app){

    var ProdutoModel = app.models.itens;

    var ProdutoController = {
        list: function(req, res){
            ProdutoModel.list(req, res);
        },
        get: function(req, res){
            ProdutoModel.get(req, res);
        },
        findBy: function(req, res){
            ProdutoModel.findBy(req, res);
        },
        create: function(req, res){
            ProdutoModel.create(req, res);
        },
        update: function(req, res){
            ProdutoModel.update(req, res);
        },
        delete: function(req, res){
            ProdutoModel.delete(req, res);
        }
    };

    return ProdutoController;
};