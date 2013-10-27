var express = require("express");
var app = express();
var port = 1337;

app.listen(port);

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/test', function(req, res) {
    res.send('test render');
});

app.get('/user/:id', function(req, res) {
    res.send('user: ' + req.params.id + ' user page');
});

app.get(/^\/ip?(?:\/(\d{2,3})(?:\.(\d{2,3}))(?:\.(\d{2,3}))(?:\.(\d{2,3})))?/, function(req, res) {
    res.send(req.params);
});

app.get('*', function(req, res) {
    res.send('Page not found', 404);
});
console.log("express server running at http://127.0.0.1:" + port);
