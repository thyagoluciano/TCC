/**
 * GET Home page.
 */
module.exports = function(app){
    var admin = app.controllers.admin;
    var autenticar = require('./../middleware/autenticadorAdmin');


    app.get('/admin', admin.index);
    app.get('/admin/manager', admin.manager);

    app.get('/angular/:diretorio/:name', admin.angular);
    app.get('/angular/:diretorio/:diretorio1/:name', admin.angular1);
};
