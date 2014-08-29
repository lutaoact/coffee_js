fork = require('child_process').fork
cpus = require('os').cpus()

server = do require('net').createServer
server.listen 1337

limit = 10
during = 1000
restart = []
isTooFrequently = () ->
  time = do Date.now
  length = restart.push time
  if length > limit
    restart = restart.slice limit * -1

  return restart.length >= limit && restart[restart.length - 1] - restart[0] < during

workers = {}
createWorker = () ->
  if isTooFrequently()
    return process.emit 'giveup'

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

#setTimeout () ->
#  process.emit 'giveup'
#, 2000

process.on 'exit', () ->
  do worker.kill for pid, worker of workers

process.on 'giveup', () ->
  process.exit 1
