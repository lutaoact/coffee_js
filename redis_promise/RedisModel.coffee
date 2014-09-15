_  = require 'lodash'
Q = require 'q'
pool = require './client_pool'

class RedisModel
  constructor: () ->
    console.log 'RedisModel constructor'

  client_pool: pool

  asyncClient: () ->
    @client_pool.acquireAsync()
    .then (client) =>
      client.q = @getQPromiseOps client
      client

  releaseClient: (client) ->
    @client_pool.release client

  getQPromiseOps: (client) ->
    functions = _.functions client
    ops = functions.filter (f) ->
      return f.toUpperCase() is f

    lc = (op.toLowerCase() for op in ops)
    ops = ops.concat lc

    q = {}
    for op in ops
      q[op] = Q.nbind client[op], client

    q['multi'] = q['MULTI'] = () ->
      m = client.multi.apply client, arguments
      m.exec = Q.nbind m.exec, m
      m
    q

module.exports = RedisModel
