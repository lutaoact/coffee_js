Animal = require './Animal'

class Horse extends Animal
  move: () ->
    console.log 'Galloping...'
    super 45

module.exports = Horse
