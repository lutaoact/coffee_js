redis = require 'redis'
client = do redis.createClient

client.on 'error', (err) ->
  console.log 'Error:', err

client.on 'connect', () ->
  client.set 'string key', 'hello world', redis.print

  client.expire 'string key', 3

  myTimer = setInterval () ->
    client.get 'string key', (err, reply) ->
      if reply?
        console.log "I live: #{reply.toString()}"
        client.ttl 'string key', (err, data) ->
          console.log "I live for this long yet: #{data}"
      else
        clearInterval myTimer
        console.log 'I expired'
        client.quit()
  , 1000

  console.log myTimer
