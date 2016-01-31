'use strict';
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var message = new Buffer('深入浅出NodeJs');

client.send(message, 0, message.length, 41234, 'localhost', (err, bytes) => {
  client.close();
});
