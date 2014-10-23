#!/usr/bin/env node

var irc  = require('irc');
var config = require('./config');

var client = new irc.Client(
  config.irc_server,
  config.logger_nickname,
  {
    channels: [config.channel]
  }
);

var eventStr = 'message' + config.channel;
client.addListener(eventStr, function (from, message) {
    console.log('<%s> %s', from, message);
});
