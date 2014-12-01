request = require('request')
fs = require 'fs'

# 下载图片
#urla = 'https://ununsplash.imgix.net/uploads/141362941583982a7e0fc/abcfbca1?q=75&fm=jpg&s=5266baf09e0e878b72b2e34adf2f54a0'
#request(urla).pipe(fs.createWriteStream('a.jpg'))

urlb = 'https://ununsplash.imgix.net/photo-1415226194219-638f50c5d25f?q=75&fm=jpg&s=f6023ef5a263558b47f4bacc775bfc88'
request(urlb).pipe(fs.createWriteStream('b.jpg'))

#email = "12@12.com"
#password = "111111"
#
#request.get('http://localhost:4567/login', (err, res, body) ->
#  console.log err
#  console.log res.headers
#
#  csrftoken = /<input type="hidden" name="_csrf" value="(.*?)" id="csrf-token"/.exec(body)[1]
#  console.log csrftoken
#  authAttributes = { _csrf: csrftoken, email: email, password: password }
#  request.post('http://localhost:4567/login', {body: authAttributes, json: true}, (err, res, body) ->
#    console.log err
#    console.log res
#  )
#)
