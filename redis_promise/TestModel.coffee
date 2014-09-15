RedisModel = require './RedisModel'

class TestModel extends RedisModel
  constructor: () ->
    console.log 'TestModel constructor'
    super

module.exports = TestModel
