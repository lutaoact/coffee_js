_ = require 'lodash'

array = ['x', 'y']
ret = _.filter array, (ele) ->
  return ele is 'z'

console.log ret.length
