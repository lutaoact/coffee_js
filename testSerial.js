var serial = require('./serial');
var fs = require('fs');
var path = './dclient.js';
var cb = serial([
    function(err, data) {
        if (!err) {
            if (data.isFile) {
                fs.readFile(path, cb);
            }
        } else {
            console.log(err);
        }
    },
    function(err, data) {
        if (!err) {
            console.log('[flattened by serial:]');
            console.log(data.toString('utf8'));
        } else {
            console.log(err);
        }
    }
]);
fs.stat(path, cb);

fs.stat(path, function(err, data) {
    if (!err) {
        if (data.isFile) {
            fs.readFile(path, function(err, data) {
                if (!err) {
                    console.log('[nested callbacks:]');
                    console.log(data.toString('utf8'));
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    }
});
/*
关键在于，这些callback的执行是有顺序性的，
所以利用serial返回的一个函数cb来取代这些callback，
然后在cb中控制每次会循环呼叫的函数
就可以把巢状的callback摊平成循序的function阵列
（就是传给serial函数的参数）。
*/
