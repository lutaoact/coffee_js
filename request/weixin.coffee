request = require 'request'
appid = process.env.APPID
secret = process.env.SECRET
Q = require 'q'

url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=#{appid}&secret=#{secret}"

redis = require 'redis'
client = redis.createClient()

key = 'weixin_access_token'
remainTime = 180 #三分钟

getAccessToken = (value1, value2, cb) ->
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

getAccessTokenPromise = Q.nfbind getAccessToken
getAccessTokenPromise('xxx', 'value2')
.then (token) ->
  console.log token
, (err) ->
  console.log err
#getAccessToken (err, access_token) ->
#  console.log err, access_token
