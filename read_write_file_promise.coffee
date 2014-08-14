Q = require 'q'
fs = require 'fs'
readFile = (callback) ->
  deferred = do Q.defer
  fs.readFile 'test.js', 'utf-8', (err, data) ->
    if err then deferred.reject err else deferred.resolve data

  return deferred.promise.nodeify callback

writeFile = (data, callback) ->
  deferred = do Q.defer
  fs.writeFile 'test2.json', data, (err) ->
    if err then deferred.reject err else do deferred.resolve

  return deferred.promise.nodeify callback

#使用promise方式调用
promise = do readFile
promise.then (data) ->
  obj = JSON.parse data
  obj.b = 10
  writeFile JSON.stringify obj
.then () ->
  console.log 'success'
, (err) ->
  console.log err

#使用回调方式调用
#writeFile "hello", (err) ->
#  console.log err
#
#readFile (err, res) ->
#  console.log err
#  console.log res
