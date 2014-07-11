module.exports = function(app){

    var PagSeguroModel = app.models.pagseguro;

    var PagSeguroController = {
        pagar: function(req, res){
            PagSeguroModel.pagar(req, res);
        },

        list: function(req, res){
            PagSeguroModel.list(req, res);
        },

        get: function(req, res){
            PagSeguroModel.get(req, res);
        },

        update: function(req, res){
            PagSeguroModel.update(req, res);
        }
    };



    return PagSeguroController;
};