promisify = (res) ->
  deffered = new Deferred()

  result += ''
  res.on 'data', (data) ->
    result += data
    deffered.progress data

  res.on 'end', () ->
    deffered.resolve result

  res.on 'error', (err) ->
    deffered.reject err

  return deffered.promise

module.exports = promisify
