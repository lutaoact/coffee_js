const cheerio = require('cheerio')
const async = require('async')
const cheerioTableparser = require('cheerio-tableparser');

let html = `
<table>
				<tr>
					<td>2146</td>
					<td>分段收费问题</td>
					<td>例9-复杂分段问题 <a href="http://niuwaketang.ufile.ucloud.com.cn/sxc_151563951045.mp4" style="margin-left:5px;" target="_blank">查看</a></td>
					<td>sxc_151563951045.jpg <a href="http://niuwaketang.ufile.ucloud.com.cn/sxc_151563951045.jpg" style="margin-left:5px;" target="_blank">查看</a></notempty></td>
					<td>2018-01-11 11:01:50</td>
					<td>胡骏</td>
					<td>5</td>
					<td>9</td>
					<td>
						<a href="/index.php?g=Niuxiaowa&m=Video&a=ViewVideoMessage&id=2146">查看课程留言</a>
						&nbsp&nbsp|&nbsp&nbsp
						<a href="/index.php?g=Niuxiaowa&m=Video&a=VideoEdit&id=2146" target="_blank">编辑</a>&nbsp&nbsp|&nbsp&nbsp
												<a href="/index.php?g=Niuxiaowa&m=Video&a=VideoDelurl&id=2146" class="js-ajax-delete">删除视频地址</a>&nbsp&nbsp|&nbsp&nbsp
						<a href="/index.php?g=Niuxiaowa&m=Video&a=VideoDel&vid=2146" class="js-ajax-delete">删除该课程信息</a>
					</td>
				</tr>
</table>
`
let group = 2, constants = {STEP: 1000000};
const $ = cheerio.load(html, {decodeEntities: false});
let tr = $('table > tbody > tr').get(0);
console.log(getVideoLineData202($, tr));

function getVideoLineData202($, tr) {
  let data = [], url = '';
  $(tr).children().each(function(i, el) {
    if (i === 2) {
      //提取出视频的url
      let a = $(this).children('a').get(0);
      url = $(a).attr('href');
      data.push($(this).text().trim().replace(/ 查看$/, ''));
    } else if (i === 3) {
      let a = $(this).children('a').get(0);
      let capture = $(a).attr('href');
      data.push(capture);
    } else {
      data.push($(this).text().trim());
    }
  });
  return {//这里只能取到question的部分字段，剩下的字段要从edit的页面中取
    oid: group * constants.STEP + Number(data[0]),
    group,
    course: data[1],
    title: data[2],
    url,
    capture: data[3],
    creator: data[5],
    displayOrder: Number(data[7]),
  };
}

//
//const html = require('/Users/lutao/aowa-server/scripts/exam.keypoint.html.js')
//const $ = cheerio.load(html, {decodeEntities: false});
//let trs = $('body > div.js-check-wrap > form.js-ajax-form > table > tbody > tr');
//console.log(trs.length);
//
//tr = `
//<tr>
//  <li class="apple">Apple</li>
//  <li class="orange">Orange</li>
//  <li class="pear">Pear</li>
//</tr>
//`

/*
let tr = `
<table>
				<tr>
					<td>一年级</td>
					<td>2017牛娃课堂百分大法一年级上学期期末试卷C</td>
					<td>90分钟</td>
					<td>171</td>
					<td>2018-01-03 15:10:11</td>
					<td>胡骏</td>
					<td>
						正常
											</td>
					<td>
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineEdit&id=177">编辑</a> | 
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineDel&id=177" class="js-ajax-delete">删除</a> | 
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineListView&id=177">查看题目</a> | 
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineListAdd&id=177">添加题目</a>

					</td>
</tr><tr>
					<td>一年级</td>
					<td>2017牛娃课堂百分大法一年级上学期期末试卷B</td>
					<td>90分钟</td>
					<td>170</td>
					<td>2018-01-03 15:09:39</td>
					<td>胡骏</td>
					<td>
						正常
											</td>
					<td>
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineEdit&id=176">编辑</a> | 
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineDel&id=176" class="js-ajax-delete">删除</a> | 
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineListView&id=176">查看题目</a> | 
						<a href="/index.php?g=Niuxiaowa&m=Examine&a=ExamineListAdd&id=176">添加题目</a>

					</td>
				</tr>
</table>
`;
const $ = cheerio.load(tr, {decodeEntities: false});
*/

//cheerioTableparser($);
//var data = $("table").parsetable(false, false, false);
//console.log(data);
let data = [];
//$('tr').children().each(function(i, el) {
//  if ((i + 1) % 8 === 0) {
//    let a = $(this).children('a').get(0);
//    data.push($(a).attr('href'));
//  } else {
//    data.push($(this).text().trim());
//  }
//});
//
//async.eachOfSeries($('tr').children(), function(el, i, _cb) {
//  if ((i + 1) % 8 === 0) {
//    let a = $(el).children('a').get(0);
//    let href = $(a).attr('href');
//    data.push(href.match(/id=(\d+)/)[1]);
//  } else {
//    data.push($(el).text().trim());
//  }
//  _cb();
//}, () => {
//  console.log(data);
//})
