EventEmitter = require('events').EventEmitter
util = require 'util'

Promise = () ->
  EventEmitter.call @
util.inherits Promise, EventEmitter

Promise::then = (fulfilledHandler, errHandler, progressHandler) ->
  if typeof fulfilledHandler is 'function'
    @once 'success', fulfilledHandler

  if typeof errHandler is 'function'
    @once 'error', errHandler

  if typeof progressHandler is 'function'
    @once 'progress', progressHandler

  return this

Deferred = () ->
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

###
util.inherits = function (ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}
###
