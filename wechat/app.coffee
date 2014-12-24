wechat = require 'wechat'
express = require 'express'

app = express()
port = 80

app.listen port

app.get '/', (req, res) ->
  res.send hello: 'girlfriend'

app.use '/wechat', wechat('xsdmyxtzzyyjsx', (req, res) ->
  message = req.weixin
  if message.MsgType is 'text'
    res.reply "你说啥？你说的是不是：#{message.Content}"
  else
    res.reply 'hello girlfriend'
)
