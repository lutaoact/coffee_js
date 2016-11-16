'use strict';

var socket = require('socket.io-client')('http://127.0.0.1:3000');

socket.on('connect', function() {
  console.log('client connect');
});
socket.on('event', function(data) {
  console.log('client event', data);
});
socket.on('disconnect', function() {
  console.log('client disconnect');
});

socket.on('news', function(data) {
  console.log('client news', data);
});
