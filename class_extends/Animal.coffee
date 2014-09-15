class Animal
  constructor: (@name) ->

  move: (meters) ->
    console.log "#{@name} moved #{meters}m."

module.exports = Animal
