let https = require('https');
let fs = require('fs');

let options = {
  key: fs.readFileSync('./server.key'), //私钥
  cert: fs.readFileSync('./server.crt'),//证书
  ca: fs.readFileSync('./ca.crt'), //自签证书，必须提供ca证书，否则无法通过验证
  requestCert: true,//要求客户端也必须提供证书，并可进行验证，也就是客户端也必须有ca.crt，否则自签证书过不了
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello World');
}).listen(8000);

//curl -k https://127.0.0.1:8000
//curl --cacert ca.crt https://lutao.me:8000
