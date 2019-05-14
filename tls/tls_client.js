'use strict';

const tls = require('tls');
const fs = require('fs');

const options = {
  host: "server.lutao.me",//这里的域名需要和server端证书的Common Name相匹配
  port: 8000,
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  ca: [fs.readFileSync('./ca.crt')],
};

let count = 0;
const client = tls.connect(options, () => {
  console.log(`server connected ${client.authorized ? 'authorized' : 'unauthorized'}`);
//  process.stdin.pipe(client);
  setInterval(() => {
    client.write(new Date().getTime() + '');
  }, 1000)
});

client.setEncoding('utf8');
client.on('data', (data) => {
  console.log(data);
});
client.on('error', (err) => {
  console.log(err);
});
client.on('end', () => {
  console.log('end');
});
