cp = require 'child_process'
child1 = cp.fork __dirname + '/child.coffee'
child2 = cp.fork __dirname + '/child.coffee'
server = require('net').createServer()

server.on 'connection', (socket) ->
  console.log 'server here'
  socket.end 'handled by parent\n'

server.listen 1337, () ->
  child1.send 'server', server
  child2.send 'server', server
