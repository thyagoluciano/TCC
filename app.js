/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var avatar  = require('./routes/avatar');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
// Rota Padão.
app.get('/', routes.index);


/**
 * API User
 */
app.get('/api/users', user.list);           // Lista todos os Usuários do BD
app.get('/api/users/:id', user.get);        // Lista Usuário pelo ID
app.post('/api/users', user.create);        // Insere um Usuário no BD
app.put('/api/users/:id', user.update);     // Atualiza um Usuário no BD
app.delete('/api/users/:id', user.delete);  // Deleta um Usuário no BD
/**
 * API Avatar
 */
app.get('/api/avatar', avatar.list);
app.get('/api/avatar/:id', avatar.get);
app.post('/api/avatar', avatar.create);
app.put('/api/avatar/:id', avatar.update);
app.delete('/api/avatar/:id', avatar.delete);


//app.get('/partials/:name', routes.partials);
//app.get('/angular/:diretorio/:name', routes.angular);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Restfull Server ' + app.get('port'));
});
