//var express = require('express');
//var app = express();

//app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

//app.get('/', function(request, response) {
//  response.send('Hello World!');
//});

//app.listen(app.get('port'), function() {
//  console.log("Node app is running at localhost:" + app.get('port'));
//});

//var ws = require("nodejs-websocket")
var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})