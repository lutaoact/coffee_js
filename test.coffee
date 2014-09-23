require './common/init'
data = [
  name: 'hello'
,
  name: 'good'
]
console.log _.compact(_.pluck data, '_id').length
