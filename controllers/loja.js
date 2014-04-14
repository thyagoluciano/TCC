module.exports = function(app){

    var LojaController = {
        index: function(req, res){
            res.render('ecommerce/index', { title: 'Express'});
        }
    };

    return LojaController;
};