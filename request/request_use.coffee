request = require('request').defaults({jar: true, followRedirect: false})

email = "12@12.com"
password = "111111"

request.get('http://localhost:4567/login', (err, res, body) ->
  console.log err
  console.log res.headers

  csrftoken = /<input type="hidden" name="_csrf" value="(.*?)" id="csrf-token"/.exec(body)[1]
  console.log csrftoken
  authAttributes = { _csrf: csrftoken, email: email, password: password }
  request.post('http://localhost:4567/login', {body: authAttributes, json: true}, (err, res, body) ->
    console.log err
    console.log res
  )
)
