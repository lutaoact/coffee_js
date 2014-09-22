url = 'http://localhost:9000/sockjs'
SockJS = require 'sockjs-client'
socket = SockJS.create url
setInterval () ->
  socket.write JSON.stringify hello: 'world'
, 1000

socket.on 'data', (msg) ->
  console.log msg
