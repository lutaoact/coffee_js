Animal = require './Animal'

class Snake extends Animal
  constructor: (@name, @speed) ->
    console.log 'this is constructor'

  move: () ->
    console.log "slithering...#{@speed}"
    super 5

module.exports = Snake
