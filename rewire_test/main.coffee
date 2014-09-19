rewire = require 'rewire'
lib = rewire './index'
console.log lib.__get__.toString()
limit = lib.__get__ 'limit'
console.log limit.toString()
