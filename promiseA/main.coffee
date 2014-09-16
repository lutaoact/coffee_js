Deferred = require './Deferred'

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
