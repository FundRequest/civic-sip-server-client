var civicSip = require('civic-sip-api');
var commandLineArgs = require('command-line-args');
var optionDefinitions = [
  { name: 'appId', alias: 'i', type: String },
  { name: 'prvKey', alias: 'p', type: String },
  { name: 'appSecret', alias: 's', type: String }
];
var options = commandLineArgs(optionDefinitions);

var civicClient = civicSip.newClient({ appId: options.appId,
                                         prvKey: options.prvKey,
                                         appSecret: options.appSecret });

var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

app.listen(port);
console.log('Server started! At http://localhost:' + port);

app.get('/userdata', function(req, res) {

  var token = req.param('token');

civicClient.exchangeCode(token)
    .then(function(userData) {
        var userData = JSON.stringify(userData);
          res.setHeader('Content-Type', 'application/json');
          res.send(userData);
    }).catch(function(error) {
          res.status(500).send('Invalid token');
  });

});


