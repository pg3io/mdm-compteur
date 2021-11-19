const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const config = require('./config')
if (config.instagram.active)
    var instagram = require('./providers/instagram');
if (config.twitter.active)
    var twitter = require('./providers/twitter');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    var end_hour = new Date(config.end_hour)
    io.emit('end hour', end_hour.getTime());
    console.log('Nouvelle connexion au serveur !');
    if (config.twitter.active)
        twitter.get(function (error, result) {
            if (!error && result) {
                io.emit('refresh counter twitter', result)
                console.log('refresh counter twitter', result);
            } else {
                console.error('Twitter:', error);
            }
        });
    if (config.instagram.active)
        instagram.get(function (error, result) {
            if(!error && result) {
                io.emit('refresh counter instagram', result);
                console.log('refresh counter instagram', result);
            } else {
                console.error('Instagram:', error);
            }
        });
    socket.on('disconnect', function() {
        console.log('Déconnexion du serveur');
    });
    setInterval(function () {
        if (config.twitter.active)
            twitter.get(function (error, result) {
                if (!error && result) {
                    io.emit('refresh counter twitter', result)
                    console.log('refresh counter twitter', result);
                } else {
                    console.error('Twitter:', error);
                }
            });
        if (config.instagram.active)
            instagram.get(function (error, result) {
                if(!error && result) {
                    io.emit('refresh counter instagram', result);
                    console.log('refresh counter instagram', result);
                } else {
                    console.error('Instagram:', error);
                }
            });
    }, config.interval_seconds * 1000);
});

http.listen(config.port || 3000, function(){
    console.log('Écoute sur le port 3000');
});


