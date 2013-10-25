var express = require("express");
var app = express();
var port = 1337;

app.listen(port);

app.get('/', function(req, res) {
    res.send('hello world');
});

console.log("express server running at http://127.0.0.1:" + port);
