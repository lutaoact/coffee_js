class Promise
  constructor: () ->
    @queue = []
    @isPromise = true

Promise::then = (fulfilledHandler, errorHandler) ->
  handler = {}
  if typeof fulfilledHandler is 'function'
    handler.fulfilled = fulfilledHandler

  if typeof errorHandler is 'function'
    handler.error = errorHandler

  @queue.push handler
  return @

module.exports = Promise
