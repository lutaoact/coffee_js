var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log(socket.request.headers);
  console.log('hello girlfriend');
  socket.emit('news', {hello: 'world'});
  socket.on('event', function(data){
    console.log(data);
  });
  socket.on('disconnect', function(){
    console.log('now disconnect');
  });
});
console.log('websocket listening on 127.0.0.1:3000');
server.listen(3000);
