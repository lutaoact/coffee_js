TestModel = require './TestModel'

test = new TestModel
console.log test.client_pool.getName.toString()

test.asyncClient()
.then (client) ->
  console.log client
  client.q.hget 'hhhhh', 'good'
.then (reply) ->
  console.log reply
, (err) ->
  console.log err
