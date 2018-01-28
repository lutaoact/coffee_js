const phantom = require('phantom');
const fs = require('fs');

const UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36';
const Cookie = 'userAll=VQEDVQ5UVQsMXgRMWwRVA1wLCQgJDwxdB1RUWw0AVlA; admin_username=teacher_4; PHPSESSID=jboua50h6rbvvvhv71sr5f14g5; thinkphp_show_page_trace=0|0';
const Referer = 'http://gm.niuwaketang.com/index.php?g=Admin&m=Index&a=index';


var page = null;
var instance = null;
phantom.create().then(i => {
  instance = i;
  return instance.createPage();
}).then(p => {
  page = p;
  page.on('onResourceRequested', (requestData) => {
    console.info('Requesting', requestData.url);
  }).then(() => {});
  page.setting('userAgent', UserAgent).then(() => {});
  page.property('customHeaders', { Cookie, Referer }).then(() => {});
}).then(() => {
  return page.open('http://gm.niuwaketang.com/index.php?g=Niuxiaowa&m=Video&a=VideoEdit&id=2148').then(() => {
    return page.property('content')
  });
}).then((content) => {
  console.log(content);
  instance.exit();
}).catch(error => {
  console.log(error);
});
