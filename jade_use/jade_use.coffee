jade = require 'jade'

#fn = jade.compile 'string of jade#{hello}', pretty: true
#locals = hello: 'girlfriend'

#fn = jade.compileFile './hello.jade', pretty: true
locals =
  hello: 'girlfriend'
  webview: 'webview'
  initUser: 'webview'
  initNotify: 'webview'

html = jade.renderFile './hello2.jade', locals

#html = fn(locals)
console.log html
