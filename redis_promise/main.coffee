RedisModel = require './RedisModel'

redisModel = new RedisModel

redisModel.set 'hello', 'world'
.then () ->
  redisModel.get 'hello'
.then (reply) ->
  console.log reply
, (err) ->
  console.log err
