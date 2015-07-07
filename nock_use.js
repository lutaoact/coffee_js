var nock = require('nock');
var request = require('request');

var baseUrl = 'http://baidu.com';

var couchdb = nock(baseUrl)
                .get('/users/1')
                .reply(200, {
                  _id: '123ABC',
                  _rev: '946B7D1C',
                  username: 'pgte',
                  email: 'pedro.teixeira@gmail.com'
                });

request(baseUrl + '/users/1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
  console.log(error);
})
