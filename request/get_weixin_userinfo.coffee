request = require 'request'

url = 'https://api.weixin.qq.com/sns/userinfo?access_token=OezXcEiiBSKSxW0eoylIeCnaKHwusXk1Loei0ToP_Em5JvwIpPibblFaADeyiOxSydWiaUp6Xnsqmiqjz9kuG7n_UbWIh9nhvLoQbd8ulJwweRF8kB7Ec_Xk4b35K2lO5qrZ9mY6Px5c0HGBnb7jpg&openid=oEEPdjuKMXW2go6PXei-2hFD643Y'

#token = 'tLFTp6mkrBHoh-RPSPdtDvwLpDiED_CSW6lytqccA4WLHpz-rBv38chs4MEXm87mf_dhzSvT9sZQwV4XreJI-_r_vW9hrtNLdpz2GSufpek'
#https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
request url, (err, res, body) ->
  obj = JSON.parse body
  console.log err, obj
