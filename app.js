#!/usr/bin/env node

var irc  = require('irc');
var util = require('util');

var c = new irc.Client(
  'irc.freenode.net',
  'nodebot',
  {
    channels: ['#testchan']
  }
);

c.addListener('raw', function(message) { console.log('raw: ', message) });
c.addListener('error', function(message) { console.log(message) });

var repl = require('repl').start('> ');
repl.context.repl = repl;
repl.context.util = util;
repl.context.irc = irc;
repl.context.c = c;

repl.inputStream.addListener('close', function() {
  console.log("\nClosing session");
  c.disconnect('Closing session');
});
