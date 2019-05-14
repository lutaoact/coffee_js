let https = require('https');
let fs = require('fs');

let options = {
  hostname: 'server.lutao.me',
  port: 8000,
  path: '/',
  method: 'GET',
//  key: fs.readFileSync('./client.key'),
//  cert: fs.readFileSync('./client.crt'),
  ca: [fs.readFileSync('./ca.crt')],
};

options.agent = new https.Agent(options);

let req = https.request(options, (res) => {
  res.setEncoding('utf-8');
  res.on('data', (d) => {
    console.log(d);
  });
});
req.end();

req.on('error', (e) => {
  console.log(e);
});
