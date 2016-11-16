'use strict';

var socket = require('socket.io-client')('http://127.0.0.1:1111');

//const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmNiMDI2NTVlNmI5YTBmMmRkM2YwMzYiLCJpYXQiOjE0NzI2MTI5MDF9.2l4F2w3dsFIL-TKCJY9png0wR9iZ7R2qVPiOV25XMyw';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmNiMDI2NTVlNmI5YTBmMmRkM2YwMzYiLCJpYXQiOjE0NzI2MTI5MDF9.2l4F2w3dsFIL-TKCJY9png0wR9iZ7R2qVPiOV2XMyw';

socket.on('connect', function() {
  socket
    .emit('authenticate', {token}) //send the jwt
    .on('authenticated', function () {
      console.log('authenticated success');
      //do other things
      socket.on('news', function(data) {
        console.log('authenticated client news', data);
      });
    })
    .on('unauthorized', function(msg) {
      console.log("unauthorized: " + JSON.stringify(msg.data));
      throw new Error(msg.data.type);
    })
});
//socket.on('event', function(data) {
//  console.log('client event', data);
//});
//socket.on('disconnect', function() {
//  console.log('client disconnect');
//});
//
//socket.on('news', function(data) {
//  console.log('client news', data);
//});
