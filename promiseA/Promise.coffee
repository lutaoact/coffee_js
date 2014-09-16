EventEmitter = require('events').EventEmitter
util = require 'util'

Promise = ->
  EventEmitter.call @
util.inherits Promise, EventEmitter

Promise.prototype.then = (fulfilledHandler, errHandler, progressHandler) ->
  if typeof fulfilledHandler is 'function'
    this.once 'success', fulfilledHandler

  if typeof errHandler is 'function'
    this.once 'error', errHandler

  if typeof progressHandler is 'function'
    this.once 'progress', progressHandler
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
