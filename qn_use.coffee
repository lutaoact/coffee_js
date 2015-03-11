_ = require 'lodash'
#url = require 'url'
#
#u = url.parse '/pfop/'
#path = u.path
#console.log path
#

qiniu = require 'qiniu'
qiniu.conf.ACCESS_KEY = 'ZgraDo7E1x5ngVQQZFI_2CrcKTDnGNeMS8HDctYT'
qiniu.conf.SECRET_KEY = 'eupT0QoatGxQFOvzyfUwvdIjuVEoD3A1dlWrQOME'
#console.log qiniuUtil.urlsafeBase64Encode 'https://raw.githubusercontent.com/lutaoact/gale/master/local_data/L01-54/lesson01双语.srt'
#console.log qiniuUtil.urlsafeBase64Encode 'https://raw.githubusercontent.com/lutaoact/gale/master/local_data/L01-54/lesson01%E5%8F%8C%E8%AF%AD.srt'

#srtPath = 'https://raw.githubusercontent.com/lutaoact/gale/master/local_data/L01-54/lesson01双语.srt'
srtPath = 'https://raw.githubusercontent.com/lutaoact/gale/master/local_data/L01-54/lesson01%E5%8F%8C%E8%AF%AD.srt'
#postData = 'bucket=qiniu-ts-demo&key=sample.wav&fops=avthumb%2Fmp3%2Far%2F44100%2Faq%2F3&notifyURL=http%3A%2F%2Ffake.com%2Fqiniu%2Fnotify'
subtitleUrl = qiniu.util.urlsafeBase64Encode srtPath
#console.log subtitleUrl
fops = encodeURIComponent "avthumb/mp4/subtitle/#{subtitleUrl}"
postData =
  bucket: 'wind'
  key: encodeURIComponent 'videos/sample.mp4'
  fops: fops
postDataString = (_.map postData, (value, key) ->
  return "#{key}=#{value}"
).join '&'
console.log postDataString

urlPath = '/pfop/'

console.log qiniu.util.generateAccessToken('/pfop/', postDataString)
