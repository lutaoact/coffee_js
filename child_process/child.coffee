process.on 'message', (m, server) ->
  if m is 'server'
    server.on 'connection', (socket) ->
      console.log 'child here'
      socket.end "handled by child, pid is #{process.pid}\n"
