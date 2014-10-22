var irc = require("irc");

var client = new irc.Client('irc.freenode.net', 'irclogger', {
  port: 6697,
  channels: ['#reactjs'],
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});
