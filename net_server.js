'use strict';

var net = require('net');

var server = net.createServer((socket) => {//connection listener
  socket.setNoDelay(true);
  socket.on('data', (data) => {
    console.log(data.toString());
    socket.write(data);
  });

  socket.on('end', () => {
    console.log('连接断开');
  });

  socket.write('欢迎光临我的TCP测试服务器\n');
//  socket.pipe(socket); //echo server
});

//监听端口
server.listen(8124, () => {
  console.log('server bound');
});
//监听套接字 可以用 nc -U /tmp/echo.sock来测试
//server.listen('/tmp/echo.sock', () => {
//  console.log('server bound on echo.sock');
//});

server.on('listening', () => {
  console.log('here is listening');
});

server.on('close', () => {
  console.log('here is close');
});

server.on('error', (err) => {
  console.log(err);
  console.log('here is error');
});
