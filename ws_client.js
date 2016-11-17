var WebSocket = require('faye-websocket'),
//    ws        = new WebSocket.Client('ws://localhost:1111/ws?token=xxxxx');
    ws        = new WebSocket.Client('ws://dev.api.gw.stockalert.cn/ws?token=xxxx');

ws.on('open', function(event) {
    console.log('open');
    setInterval(function() {
//        if (ws) ws.send(JSON.stringify({user_id: process.env.U}));
        ws.send('hello world');
    }, 1000);
});

ws.on('message', function(event) {
  console.log(event.data);
});

ws.on('close', function(event) {
  console.log('close', event);
  console.log('close', event.code, event.reason);
  ws = null;
});
