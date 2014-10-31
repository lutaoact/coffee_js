Horse = require './Horse'
Snake = require './Snake'

console.log Horse.name

snake = new Snake 'snake', 10
horse = new Horse 'horse'

snake.move()
horse.move()
console.log snake.constructor.name
#console.log Object.prototype.toString(snake.constructor)
