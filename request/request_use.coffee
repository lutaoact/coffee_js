request = require('request')
fs = require 'fs'

# 下载图片
#urla = 'https://ununsplash.imgix.net/uploads/141362941583982a7e0fc/abcfbca1?q=75&fm=jpg&s=5266baf09e0e878b72b2e34adf2f54a0'
#request(urla).pipe(fs.createWriteStream('a.jpg'))
#
#urlb = 'https://ununsplash.imgix.net/photo-1415226194219-638f50c5d25f?q=75&fm=jpg&s=f6023ef5a263558b47f4bacc775bfc88'
#request(urlb).pipe(fs.createWriteStream('b.jpg'))

options =
  url: 'https://api.github.com/repos/request/request'
  headers:
    'User-Agent': 'request'

request(options, (error, response, body) ->
  if error then return console.log error
  unless response.statusCode == 200 then return console.log response.statusCode

  info = JSON.parse(body)
  console.log(info.stargazers_count + " Stars")
  console.log(info.forks_count + " Forks")
)
