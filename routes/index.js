/**
 * GET Home page.
 */
module.exports = function(app){
    var site = app.controllers.site;
    app.get('/', site.index);
    app.post('/entrar', site.login);
    app.get('/sair', site.logout);


    app.get('/angular/:diretorio/:name', site.angular);
};


