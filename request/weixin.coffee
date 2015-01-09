request = require 'request'
appid = process.env.APPID
secret = process.env.SECRET

url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=#{appid}&secret=#{secret}"

redis = require 'redis'
client = redis.createClient()

key = 'weixin_access_token'
remainTime = 180 #三分钟

getAccessToken = (cb) ->
  client.hgetall key, (err, obj) ->
    if err then return cb err

    now = new Date().getTime() // 1000
    if now - ~~obj.timestamp + remainTime > ~~obj.expires_in
      request(url, (err, res, body) ->
        if err then return cb err
        obj = JSON.parse body
        obj.timestamp = new Date().getTime() // 1000
        client.hmset key, obj
        cb null, obj.access_token
      )
    else
      cb null, obj.access_token

getAccessToken (err, access_token) ->
  console.log err, access_token
