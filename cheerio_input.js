const cheerio = require('cheerio')
const async = require('async')

//const html = require('/Users/lutao/aowa-server/scripts/online.question.html.js')
//const html = require('/Users/lutao/aowa-server/scripts/online.question4.html.js')
const html = require('/data/tmp/video.edit.html.js')
const $ = cheerio.load(html, {decodeEntities: false});
let explain = $('body > div.js-check-wrap > form.form-horizontal table > tbody > tr #video_describe');
let form = $('body > div.js-check-wrap > form');
//let trs = $('body > div.js-check-wrap > form.form-horizontal > table > tbody > tr');
console.log(form.html());
console.log(form.serializeArray());
console.log(explain.html())
//console.log(trs.length);
//console.log($(trs.get(2)).html());
//console.log($(trs.get(2)).children('input').html());
//console.log($(trs).html());
