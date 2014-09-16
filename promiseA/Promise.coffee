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
  return# you have to add this line if it's a constructor

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

Q = require 'q'
fs = require 'fs'
readFile = (file, encoding) ->
  deferred = Q.defer()
  fs.readFile file, encoding, deferred.makeNodeResolver()
  return deferred.promise

promise1 = readFile 'foo.txt', 'utf-8'
promise2 = readFile 'bar.txt', 'utf-8'
deferred = new Deferred()
deferred.all [promise1, promise2]
.then (results) ->
  console.log results
, (err) ->
  console.log err
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
