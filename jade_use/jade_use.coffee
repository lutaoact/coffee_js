jade = require 'jade'
ejs = require 'ejs'
fs = require 'fs'

#fn = jade.compile 'string of jade#{hello}', pretty: true
#locals = hello: 'girlfriend'

#fn = jade.compileFile './hello.jade', pretty: true
locals =
  webview: 'webview'
  initUser: 'webview'
  initNotify: 'webview'
  pretty: true

html = jade.renderFile './hello2.jade', locals
console.log html

fileString = fs.readFileSync './hello.html', {encoding: 'utf-8'}
console.log ejs.render fileString, {embed: html}

#html = fn(locals)
