fork = require('child_process').fork
cpus = require('os').cpus()

server = do require('net').createServer
server.listen 1337

workers = {}
createWorker = () ->
  worker = fork __dirname + '/worker.coffee'
  worker.on 'exit', () ->
    console.log "Worker #{worker.pid} exited."
    delete workers[worker.pid]

  worker.on 'message', (message) ->
    do createWorker if message.act is 'suicide'

  worker.send 'server', server
  workers[worker.pid] = worker
  console.log "Create worker. pid: #{worker.pid}"

do createWorker for num in [1 .. cpus.length]

process.on 'exit', () ->
  do worker.kill for pid, worker of workers
