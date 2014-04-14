/**
 * Module dependencies.
 */

var express = require('express'),
    load    = require('express-load');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('tcc'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

load('models')
    .then('controllers', { verbose: true})
    .then('routes')
    .into(app);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


//app.get('/partials/:name', routes.partials);
//app.get('/angular/:diretorio/:name', routes.angular);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Restfull Server ' + app.get('port'));
});
