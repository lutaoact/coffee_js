'use strict';

const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  requestCert: true,
  ca: [fs.readFileSync('./ca.crt')],
//  ca: [fs.readFileSync('./client.crt'), fs.readFileSync('./ca.crt')],
};

const server = tls.createServer(options, (socket) => {
  console.log(`server connected ${socket.authorized ? 'authorized' : 'unauthorized'}`);
  socket.write('welcome\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});

server.listen(8000, () => {
  console.log('tls server listenning on 127.0.0.1:8000...');
});

//openssl s_client -connect 127.0.0.1:8000
