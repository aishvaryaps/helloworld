var http = require("http"),
  //url = require("url"),
  path = require("path"),
  //fs = require("fs"),
  port = process.argv[2] || 9999;
var express = require('express')
var app = express()

const tracer = require('signalfx-tracing').init({
    service: 'node-app-2',
    url: 'http://SignalFx-LB-226369023.us-east-2.elb.amazonaws.com/v1/trace'
  })

app.get('/demo', (req, res) => {
  const span = tracer.scope().active()
  span.setTag('requestHeader', req.header('x-my-important-header'))
})

var generalUsage = require('./public/general_usage.js')

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/test', function (req, res) {
  generalUsage.loop()
  res.send('OK');
})



app.get('/hit', function (req, res) {
  res.send('hit');
})
app.listen(port);

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
