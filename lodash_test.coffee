_ = require 'lodash'

array = ['x', 'y']
ret = _.filter array, (ele) ->
  return ele is 'z'

console.log ret.length

array = [id: 1]
obj = {2: {id: 2}}
ret = _.indexBy array, 'id'
console.log ret
console.log _.extend obj, ret
console.log obj
