var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var pinyin = require('pinyin');

suite.add('segment#false', function() {
  pinyin("长沙", {
    style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
    heteronym: true,
  });
}).add('segment#true', function() {
  pinyin("长沙", {
    style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
    heteronym: true,
    segment: true                 // 启用分词，以解决多音字问题。
  });
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
