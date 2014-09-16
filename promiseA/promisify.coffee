promisify = (res) ->
  deferred = new Deferred()

  result += ''
  res.on 'data', (data) ->
    result += data
    deferred.progress data

  res.on 'end', () ->
    deferred.resolve result

  res.on 'error', (err) ->
    deferred.reject err

  return deferred.promise

module.exports = promisify
