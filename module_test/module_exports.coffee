exports = {}
module.exports = exports

do (exports) ->
  module.exports = 'xxxx'
#  exports = a:'b', c: 'd'
  exports.a = 'b'

console.log module.exports
