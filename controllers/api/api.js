module.exports = function(app){

    var ApiController = {
        index: function(req, res){
            res.render('api/index', { title: 'Express'});
        }
    };

    return ApiController;
};