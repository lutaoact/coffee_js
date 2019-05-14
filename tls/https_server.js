let https = require('https');
let fs = require('fs');

let options = {
  key: fs.readFileSync('./server.key'), //私钥
  cert: fs.readFileSync('./server.crt'),//证书
//  ca: fs.readFileSync('./ca.crt'),
//  requestCert: true,
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello World');
}).listen(8000);
