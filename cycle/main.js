//在require循环调用中，当require函数返回时
//有可能这个文件还没有被执行完
console.log('main starting');
var a = require('./a.js');
var b = require('./b.js');
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);
/*
 * When main.js loads a.js, then a.js in turn loads b.js.
 * At that point, b.js tries to load a.js.
 * In order to prevent an infinite loop,
 * an unfinished copy of the a.js exports object is returned to the b.js module.
 * b.js then finishes loading,
 * and its exports object is provided to the a.js module.
 * 如果a.js的exports对象不返回，则会陷入无限循环
 */
