cp = require 'child_process'
child1 = cp.fork __dirname + '/child_http.coffee'
child2 = cp.fork __dirname + '/child_http.coffee'
server = require('net').createServer()

server.listen 1337, () ->
  child1.send 'server', server
  child2.send 'server', server
  do server.close
