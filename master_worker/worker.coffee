http = require 'http'
server = http.createServer (req, res) ->
  res.writeHead 200, 'Content-Type': 'text/plain'
  res.end "handled by child, pid is #{process.pid}\n"
  throw new Error #模拟发生uncaughtException

worker = undefined
process.on 'message', (m, tcp) ->
  if m is 'server'
    worker = tcp
    worker.on 'connection', (socket) ->
      server.emit 'connection', socket

process.on 'uncaughtException', () ->
  worker.close () ->
    process.exit 1

  process.send act: 'suicide'
