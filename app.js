//  consumer_key:        'HtP114me0TaOFYFEDDwMYA',
//  consumer_secret:     'jyW1VCEDsAC58zXZv5m0sz8JBhN23h6QmIgMhFv0EY',
//  access_token:        '179249265-9tO98UWDoP6NmuSdeW03aYO0dRijtGm6X0sQ9MZ5',
//  access_token_secret: 'HAoyGuGYdInkKQ017JIryx8UloS9ncoCZTDeM2eZCI'

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , Twit = require('twit')
  , target = ['#CPBR9']
  , frase = '#CPBR9'
  , io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/set/:hashtag', function (req, res) {
  if (req.params.hashtag != null) {
    target = ['#CPBR9', req.params.hashtag.toUpperCase()];
  }
  res.sendFile(__dirname + '/');
});

server.listen(process.env.PORT || 3000);
console.log('listando...')

var api = new Twit({
    consumer_key:         'okfPHS3Hgdedz0S0bvutrmDNl'
  , consumer_secret:      '7CYNEAA2WyDlHIW3Hx8M51FUV8ZMvECuTu5X6nhaUB45oyjQJq'
  , access_token:         '179249265-LKqFINxf4f7R3Mubde7jBAYYsdP8HCUH0E789Owj'
  , access_token_secret:  'inF9vTELjKqDvCppBPvRWP7PsWte8Z0RNDae5rcie1ObO'
})

var stream = api.stream('statuses/filter', { track: target });

// stream.on('tweet', function (tweet) {
//   console.log(tweet.text);
// });

var tweets = 0;
var tweetsArray = [1, 5, 10, 50, 100, 200];

function sendCmdArduino(cmd, callback) {

    return http.get({
        host: 'google.com.br',
        path: '/#' + cmd
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            //var parsed = JSON.parse(body);
            callback({
                enviado: cmd,
                password: 'parsed.pass'
            });
        });
    });

}

io.sockets.on('connection', function (socket) {

  console.log('cliente conectado...')

  var stream = api.stream('statuses/filter', { track: target });  

  stream.on('tweet', function (tweet) {    
    tweets++;

    //if (tweet.text.toUpperCase().indexOf(frase) > 0 && tweetsArray.indexOf(tweets) > 0) {        
    if (tweetsArray.indexOf(tweets) > 0) {
        tweet.coffee = 'danger';
        // disparar um get/post
        sendCmdArduino('ligar|forte', function(teste) {
          debugger
        });
    }

    console.log(tweets);

    io.sockets.emit('stream', tweet);
    io.sockets.emit('pesquisa', target);
  });
});