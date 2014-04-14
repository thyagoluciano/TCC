/**
 * GET Home page.
 */
module.exports = function(app){
    var api = app.controllers.api.api;
    app.get('/api', api.index);
};


