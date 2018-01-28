const cheerio = require('cheerio')

//var str = `
//<div id="test">
//
// <div>
//
//<div>a</div> <div>b</div> <div>c</div>
//
//</div>
//
// <div>
//
//<div>d</div> <div>e</div>
//
//</div>
//
//</div>
//`;

//const $ = cheerio.load(str, {decodeEntities: false});
//console.log($("#test > div").length)
//console.log($("#test div").length)

var str = `
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>
`
const $ = cheerio.load(str, {decodeEntities: false});
console.log($);
//let ul = $("#fruits");
//ul.children().each(function(i, el) {
//  console.log($(this).text())
//});
let list = $("#fruits > li");
let newList = list.map(function(i, el) {
  return $(this).text()
});
console.log(newList.get())
console.log($(list.get(0)).text())
