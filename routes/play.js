/**
 * GET Home page.
 */
module.exports = function(app){

    var autenticar = require('./../middleware/autenticador');
    var play = app.controllers.play;

    app.get('/play', autenticar, play.index);
};


