module.exports = function(app){

    var PlayController = {
        index: function(req, res){
            res.render('play/index', { title: 'Express'});
        }
    };

    return PlayController;
};