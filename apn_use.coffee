require './common/init'

fs = require 'fs'
console.log __dirname
cert = fs.readFileSync __dirname + '/cert/LeoPushCert.pem'
key  = fs.readFileSync __dirname + '/cert/LeoPushKey.pem'

console.log cert
console.log key

apn = require 'apn'

options =
  cert: cert
  key: key
  passphrase: 'password'

apnConnection = new apn.Connection(options)

token = "cb51f5a81423885045584dbf1461bed5be376d8c31d3083738691439d5589341"
myDevice = new apn.Device(token)

note = new apn.Notification()
note.alert = "新消息来了"
note.sound = 'ping.aiff'
note.sound = 'ping.aiff'
note.payload = {hello: 'girlfriend'}

apnConnection.pushNotification note, myDevice

setTimeout () ->
  process.exit 0
, 5000
