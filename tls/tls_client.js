'use strict';

const tls = require('tls');
const fs = require('fs');

const options = {
  port: 8000,
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  ca: [fs.readFileSync('./server.crt')],
};

const client = tls.connect(options, () => {
  console.log(`server connected ${socket.authorized ? 'authorized' : 'unauthorized'}`);
  process.stdin.pipe(client);
});

client.setEncoding('utf8');
client.on('data', (data) => {
  console.log(data);
});
client.on('end', () => {
  server.close();
});
