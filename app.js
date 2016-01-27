//  consumer_key:        'HtP114me0TaOFYFEDDwMYA',
//  consumer_secret:     'jyW1VCEDsAC58zXZv5m0sz8JBhN23h6QmIgMhFv0EY',
//  access_token:        '179249265-9tO98UWDoP6NmuSdeW03aYO0dRijtGm6X0sQ9MZ5',
//  access_token_secret: 'HAoyGuGYdInkKQ017JIryx8UloS9ncoCZTDeM2eZCI'

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server);

   server.listen(3000);

  app.use(express.static(__dirname + '/public'));

 app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
});

var target = ['cpbr9'];
 var api = new Twit({
    consumer_key:         'okfPHS3Hgdedz0S0bvutrmDNl'
  , consumer_secret:      '7CYNEAA2WyDlHIW3Hx8M51FUV8ZMvECuTu5X6nhaUB45oyjQJq'
  , access_token:         '179249265-LKqFINxf4f7R3Mubde7jBAYYsdP8HCUH0E789Owj'
  , access_token_secret:  'inF9vTELjKqDvCppBPvRWP7PsWte8Z0RNDae5rcie1ObO'
})

 
var stream = api.stream('statuses/filter', { track: target })

stream.on('tweet', function (tweet) {
  //console.log(tweet.text)
})

io.sockets.on('connection', function (socket) {

 var stream = api.stream('statuses/filter', { track: target })

  stream.on('tweet', function (tweet) {
    console.log(tweet.text);
    console.log(tweet.user.screen_name);
    io.sockets.emit('stream',tweet);
  });
 });