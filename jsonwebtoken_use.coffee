jwt = require 'jsonwebtoken'
fs = require 'fs'
token = jwt.sign({ foo: 'bar' }, 'shhhhh')
console.log token

jwt.verify token, 'shhhhh', (err, decoded) ->
  console.log decoded

decoded = jwt.decode token
console.log decoded

cert = fs.readFileSync('private.key')
token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'})
console.log token
