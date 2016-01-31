var net = require('net');

//var client = net.connect({path: '/tmp/echo.sock'}, () => {
var client = net.connect({port: 8124}, () => {//connection listener
  console.log('client connected');
  client.write('world!\n');
  client.on('data', (data) => {
    console.log(data.toString());
    client.end();
  });

  client.on('end', (data) => {
    console.log('client disconnected');
  });
});


