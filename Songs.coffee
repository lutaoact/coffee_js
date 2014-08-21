class Songs
  @_titles: 0
  @get_count: ->
    @_titles

  constructor: (@artist, @title) ->
    Songs._titles++

console.log do Songs.get_count

song = new Songs("rick", "never")
console.log do Songs.get_count
