/**
 * GET Home page.
 */
module.exports = function(app){
    var loja = app.controllers.loja;
    app.get('/loja', loja.index);
};


