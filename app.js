/**
 * Module dependencies.
 */

var express = require('express'),
    load    = require('express-load');

var http = require('http');
var path = require('path');

var app = express();


const KEY = 'tcc.sid', SECRET = 'tcc';

var cookie      = express.cookieParser(SECRET),
    store       = new express.session.MemoryStore(),
    sessOpts    = {secret: SECRET, key: KEY, store: store},
    session     = express.session(sessOpts);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(cookie);
app.use(session);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


var server = app.listen(app.get('port'), function(){
    console.log('Restfull Server ' + app.get('port'));
});

var io = require('socket.io').listen(server);
    io.set('log level', 2);
    io.set('authorization', function(data, accept){
        cookie(data, {}, function(err){
            var sessionID = data.signedCookies[KEY];
            store.get(sessionID, function(err, session){
                if(err || !session){
                    accept(null, false);
                }else{
                    data.session = session;
                    accept(null, true);
                }
            });
        })
    });

load('models')
    .then('controllers', { verbose: true})
    .then('routes')
    .into(app);
load('models')
    .then('sockets', { verbose: true})
    .into(io);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


//http.createServer(app).listen(app.get('port'), function(){
//    console.log('Restfull Server ' + app.get('port'));
//});


