#!/usr/bin/env node

var http = require('http');
var fs = require('fs');

var irc  = require('irc');
var config = require('./config');

// Logging client
var client = new irc.Client(
  config.irc_server,
  config.logger_nickname,
  {
    channels: [config.channel]
  }
);

// Streaming messages to file
var eventStr = 'message' + config.channel;
client.addListener(eventStr, function (from, message) {
  var timeStamp = new Date();
  var strToLog = '[' + timeStamp.toLocaleTimeString() + '] ' +
                 '<' + from + '>: ' + 
                 message + '\n';
  console.log(strToLog);
  fs.appendFile(config.log_filename, strToLog, function (err) {
    if (err) throw err;
  });
});

// Streaming messages to webserver
http.createServer(function (req, res) {
  var logStream = fs.createReadStream(config.log_filename);
  logStream.on('open', function () {
    logStream.pipe(res);
  });
  logStream.on('error', function(err) {
    res.end(err);
  });
}).listen(8080);
