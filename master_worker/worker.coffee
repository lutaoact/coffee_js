http = require 'http'
server = http.createServer (req, res) ->
  res.writeHead 200, 'Content-Type': 'text/plain'
  res.end "handled by child, pid is #{process.pid}\n"
#  throw new Error if Date.now() % 10 == 3 #模拟发生uncaughtException

worker = undefined
process.on 'message', (m, tcp) ->
  if m is 'server'
    worker = tcp
    worker.on 'connection', (socket) ->
      server.emit 'connection', socket

process.on 'uncaughtException', (err) ->
  console.error err

  process.send act: 'suicide'

  worker.close () ->
    process.exit 1

  setTimeout () ->
    process.exit 1
  , 5000
