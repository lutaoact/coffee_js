cp = require 'child_process'
n = cp.fork __dirname + '/sub'

n.on 'message', (m) ->
  console.log "PARENT got message:", m

n.send hello: 'world'
