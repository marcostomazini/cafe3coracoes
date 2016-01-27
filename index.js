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

   server.listen(8080);

  app.use(express.static(__dirname + '/public'));

 app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
});

var target = ['cricket'];
 var api = new Twit({
    consumer_key:         'HtP114me0TaOFYFEDDwMYA'
  , consumer_secret:      'jyW1VCEDsAC58zXZv5m0sz8JBhN23h6QmIgMhFv0EY'
  , app_only_auth: true
  , access_token:         '179249265-9tO98UWDoP6NmuSdeW03aYO0dRijtGm6X0sQ9MZ5'
  , access_token_secret:  'HAoyGuGYdInkKQ017JIryx8UloS9ncoCZTDeM2eZCI'
})

 
var stream = api.stream('statuses/sample')

api.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
  console.log(data)
})

stream.on('tweet', function (tweet) {
  console.log(tweet)
})

io.sockets.on('connection', function (socket) {

 var stream = api.stream('statuses/filter', { track: target })

  stream.on('tweet', function (tweet) {
    console.log(tweet);
    io.sockets.emit('stream',tweet);

  });
 });