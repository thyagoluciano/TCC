module.exports = function(app){

    var JogoController = {
        index: function(req, res){
            res.render('jogo/index', { title: 'Express'});
        }
    };

    return JogoController;
};