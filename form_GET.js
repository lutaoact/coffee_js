var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    server;

server = http.createServer(function(req, res) {
    var urlData,
        encode = 'utf8',
        filePath = 'static/express_get_example_form.html',
        action;
    urlData = url.parse(req.url, true);
    action = urlData.pathname;
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});

    if (action === '/Signup') {
        user = urlData.query;
        res.end('<h1>' + user.username + ' welcome</h1><p>我們已經將會員啟用信寄至' + user.email + "</p>");
    } else {
        fs.readFile(filePath, encode, function(err, file) {
            res.write(file);
            res.end();
        });
    }
});

server.listen(3000);
console.log('Server is running. The time is: ' + new Date());
