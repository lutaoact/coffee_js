sessions = {}
key = 'session_id'
EXPIRES = 20 * 60 * 1000

generate = () ->
  session = {}
  session.id = (new Date()).getTime() + Math.random()
  session.cookie =
    expire: (new Date()).getTime() + EXPIRES

  sessions[session.id] = session

  return session

generate()
generate()
generate()
console.log sessions
