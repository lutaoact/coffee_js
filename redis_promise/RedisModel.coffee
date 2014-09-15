require '../common/init'
generic_pool = require 'generic-pool'
redis = require 'redis'

port = 6379
endpoint = 'localhost'

pool = generic_pool.Pool
  name: 'redis'
  create: (cb) ->
    client = redis.createClient(port, endpoint)
    cb null, client
  destroy: (client) ->
    client.quit()
  max: 2
  min: 1
  idleTimeoutMills: 30000

pool.acquireAsync = Q.nbind pool.acquire, pool

pool.acquireAsync()
.then (client) ->
  client.hget 'hhhhh', 'good', (err, reply) ->
    console.log reply
, (err) ->
  console.log err
