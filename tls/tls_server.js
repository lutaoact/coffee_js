'use strict';

const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  requestCert: true,
  ca: [fs.readFileSync('./ca.crt')],
};

const server = tls.createServer(options, (socket) => {
  console.log(`server connected ${socket.authorized ? 'authorized' : 'unauthorized'}`);
  socket.write('welcome\n');
  socket.setEncoding('utf8');
//  socket.pipe(socket);
  socket.on('data', (data) => {
    console.log(data);
    socket.write("ok:" + data.toString());
  });
});

server.listen(8000, () => {
  console.log('tls server listenning on 127.0.0.1:8000...');
});

/*
# 需要指定CA机构证书，表示我信任这个机构签发的证书
openssl s_client -connect server.lutao.me:8000 -CAfile ca.crt
*/
