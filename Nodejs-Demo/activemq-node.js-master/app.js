
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var io = require('socket.io');

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
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//WEBSOCKET

var server=http.createServer(app);
io = io.listen(server);

io.configure(function () {
        io.set('authorization', function (handshakeData, callback) {
            if (handshakeData.xdomain) {
                callback('Cross-domain connections are not allowed');
            } else {
                callback(null, true);
                }
        });
});

io.sockets.on('connection', function (socket) {

    socket.on('message', function (message) {
      console.log("Got message: " + message.msg);
      ip = socket.handshake.address.address;

        socket.broadcast.emit('incomingmsg',
               {'message':message.usr + " said: " + message.msg});
            socket.emit("incomingmsg",          {'message':message.usr + " said: " + message.msg});
        });

        socket.on('disconnect', function () {
            console.log("Socket disconnected");
        });
});


