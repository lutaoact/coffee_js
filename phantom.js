const phantom = require('phantom');
const fs = require('fs');

const UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36';
const Cookie = 'userAll=VQEDVQ5UVQsMXgRMWwRVA1wLCQgJDwxdB1RUWw0AVlA; admin_username=teacher_4; PHPSESSID=jboua50h6rbvvvhv71sr5f14g5; thinkphp_show_page_trace=0|0';
const Referer = 'http://gm.niuwaketang.com/index.php?g=Admin&m=Index&a=index';

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  page.setting('userAgent', UserAgent).then(function() {});
  page.property('customHeaders', { Cookie, Referer }).then(function() {});

//  page.set('customHeades', );

//  let status = await page.open('http://gm.niuwaketang.com/index.php?g=Niuxiaowa&m=Exercises&a=ExercisesEdit&id=6280');
  let status = await page.open('http://gm.niuwaketang.com/index.php?g=Niuxiaowa&m=Video&a=VideoEdit&id=2148');
  let content = await page.property('content');
  console.log(content);

  fs.writeFile('/data/tmp/video.edit.html.js', 'module.exports = `' + content + '`;', (err) => {
    console.log(err);
  });

//  let status2 = await page.open('http://gm.niuwaketang.com/index.php?g=Niuxiaowa&m=Exercises&a=ExercisesEdit&id=6280');
//  let content2 = await page.property('content');
//
//  console.log(content2);

  await instance.exit();
})();
