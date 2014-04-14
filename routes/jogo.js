/**
 * GET Home page.
 */
module.exports = function(app){

    var autenticar = require('./../middleware/autenticador');
    var jogo = app.controllers.jogo;

    app.get('/jogo', autenticar, jogo.index);
};


