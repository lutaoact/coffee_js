#module.exports是真实存在的东西。
#exports只是module.exports的辅助对象。
#模块最终返回module.exports给调用者，而不是exports。
exports = {}
module.exports = exports

do (exports) ->
  module.exports = 'xxxx'
#  exports = a:'b', c: 'd'
  exports.a = 'b'

console.log module.exports
