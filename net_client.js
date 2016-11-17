var net = require('net');

//var client = net.connect({path: '/tmp/echo.sock'}, () => {
var client = net.connect({host: '127.0.0.1', port: 9124}, () => {//connection listener
  console.log('client connected');
  client.write('{"hello":"world"}');
  client.on('data', (data) => {
    console.log(data.toString());
    client.end();
  });

  client.on('end', (data) => {
    console.log('client disconnected');
  });
});


