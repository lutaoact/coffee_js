jade = require 'jade'

#fn = jade.compile 'string of jade#{hello}', pretty: true
#locals = hello: 'girlfriend'

#fn = jade.compileFile './hello.jade', pretty: true
locals =
  hello: 'girlfriend'
  webview: 'webview'
  initUser: 'webview'
  initNotify: 'webview'

fn = jade.renderFile './hello.jade', locals

html = fn(locals)
console.log html
