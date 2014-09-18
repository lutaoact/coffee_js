Q = require 'q'
fs = require 'fs'
#readFile = (callback) ->
#  deferred = do Q.defer
#  fs.readFile 'test.js', 'utf-8', (err, data) ->
#    if err then deferred.reject err else deferred.resolve data
##    if err then deferred.reject err else deferred.resolve a:'b'
#
#  return deferred.promise.nodeify callback

#readFile = Q.nfbind fs.readFile
#readFile 'test.js', 'utf-8'
#.done (text) ->
#  console.log text

#readFile = Q.nbind fs.readFile, fs
#readFile 'test.js', 'utf-8'
#.done (text) ->
#  console.log text
#
Q('hello')
.then (str) ->
  console.log str
.then (res) ->
  console.log res
  Q.resolve 'yyy'
.then (res1) ->
  console.log res1
, (err) ->
  console.log err

#Q(readFile()).delay 1000
#.then (data) ->
#  console.log data
#, (err) ->
#  console.log err

#readFile()
#.timeout 2
#.then (data) ->
#  console.log data
#, (err) ->
#  console.log err

#console.log do readFile().inspect

#readFile().then (data) ->
#  console.log data
#  return data
#, (err) ->
#  console.log err
#
#readFile().thenResolve 10
#.then (data) ->
#  console.log data

#readFile().get('a').then (value) ->
#  console.log value
