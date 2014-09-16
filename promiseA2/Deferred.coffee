Promise = require './Promise'

class Deferred
  constructor: () ->
    console.log 'I am in Deferred constructor'
    @promise = new Promise()

Deferred::resolve = (obj) ->
  promise = @promise
  while handler = promise.queue.shift()
    if handler?.fulfilled?
      ret = handler.fulfilled obj
      if ret?.isPromise
        ret.queue = promise.queue
        @promise = ret
        return

Deferred::reject = (err) ->
  promise = @promise
  while handler = promise.queue.shift()
    if handler?.error?
      ret = handler.error obj
      if ret?.isPromise
        ret.queue = promise.queue
        @promise = ret
        return

Deferred::callback = () ->
  (err, file) =>
    if err? then @reject err else @resolve file

module.exports = Deferred
