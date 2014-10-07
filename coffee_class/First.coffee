class First
  @namellll: 'First2'

  constructor: (@value) ->
    @name = 'First3'

  getValue: () ->
    return @value

  @getName: () ->
    return @name

module.exports = First
