Deferred = require './Deferred'

fs = require 'fs'
readFile1 = (file, encoding) ->
  deferred = new Deferred()
  fs.readFile file, encoding, deferred.callback()
  return deferred.promise

readFile2 = (file, encoding) ->
  deferred = new Deferred()
  fs.readFile file, encoding, deferred.callback()
  return deferred.promise

readFile1 'file1.txt', 'utf-8'
.then (file1) ->
  console.log file1
  readFile2 file1.trim(), 'utf-8'
.then (file2) ->
  console.log file2
#promise2 = readFile 'bar.txt', 'utf-8'
#deferred = new Deferred()
#deferred.all [promise1, promise2]
#.then (results) ->
#  console.log results
, (err) ->
  console.log err
