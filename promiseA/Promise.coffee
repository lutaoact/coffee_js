EventEmitter = require('events').EventEmitter
#util = require 'util'

#Promise = () ->
#  EventEmitter.call @
#  return
#util.inherits Promise, EventEmitter
#coffee风格的写法比js风格要简略太多了，就一行搞定
class Promise extends EventEmitter

Promise::then = (fulfilledHandler, errHandler, progressHandler) ->
  if typeof fulfilledHandler is 'function'
    @once 'success', fulfilledHandler

  if typeof errHandler is 'function'
    @once 'error', errHandler

  if typeof progressHandler is 'function'
    @once 'progress', progressHandler

  return this

module.exports = Promise

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
