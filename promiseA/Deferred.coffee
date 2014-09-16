Promise = require './Promise'

class Deferred
  constructor: () ->
    console.log 'I am in Deferred constructor'
    @state = 'unfulfilled'
    @promise = new Promise()

Deferred::resolve = (obj) ->
  @state = 'fulfilled'
  @promise.emit 'success', obj

Deferred::reject = (err) ->
  @state = 'failed'
  @promise.emit 'error', err

Deferred::progress = (data) ->
  @promise.emit 'progress', data

Deferred::all = (promises) ->
  count = promises.length
  results = []
  promises.forEach (promise, i) =>
    promise.then (data) =>
      count--
      results[i] = data
      if count is 0 then @resolve results
    , (err) =>
      @reject err

  return @promise

module.exports = Deferred
