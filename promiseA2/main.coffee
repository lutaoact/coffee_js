fs = require 'fs'
Deferred = require './Deferred'

smooth = (method) ->
  return () ->
    deferred = new Deferred()
    args = Array.prototype.slice.call arguments, 0
    args.push deferred.callback()
    method.apply null, args
    return deferred.promise

readFile = smooth fs.readFile

readFile 'file1.txt', 'utf-8'
.then (file1) ->
  console.log file1
  readFile file1.trim(), 'utf-8'
.then (file2) ->
  console.log file2
, (err) ->
  console.log err

#readFile1 = (file, encoding) ->
#  deferred = new Deferred()
#  fs.readFile file, encoding, deferred.callback()
#  return deferred.promise
#
#readFile2 = (file, encoding) ->
#  deferred = new Deferred()
#  fs.readFile file, encoding, deferred.callback()
#  return deferred.promise
#
#readFile1 'file1.txt', 'utf-8'
#.then (file1) ->
#  console.log file1
#  readFile2 file1.trim(), 'utf-8'
#.then (file2) ->
#  console.log file2
#, (err) ->
#  console.log err
