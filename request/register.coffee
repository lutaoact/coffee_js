request = require('request').defaults({jar: true, followRedirect: false})

email = "bb@bb.com"
username = 'bb'
password = "111111"
passwordConfirm = "111111"

url = 'http://localhost:4567/register'

request.get(url, (err, res, body) ->
  console.log err
  console.log res.headers

# <input type="hidden" name="_csrf" value="D9IFTOX7-e-31jEMDqs2MUzn3N4Q0Nbprd4g" />
  csrftoken = /<input type="hidden" name="_csrf" value="(.*?)" .>/.exec(body)[1]
  console.log csrftoken
  postBody =
    _csrf: csrftoken
    email: email
    username: username
    password: password
    'password-confirm': passwordConfirm

  request.post(url, {body: postBody, json: true}, (err, res, body) ->
    console.log err
    console.log body
  )
)

## post传参
# email:aa@aa.com
# username:aa
# password:aaaaaa
# password-confirm:aaaaaa
# _csrf:LpQW8WIu-KqJQ8JKCqmWUnmgWia4a-Ex-u7Q
# referrer:
