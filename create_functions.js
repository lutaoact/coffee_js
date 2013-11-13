function createFunctions() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        result[i] = function(num) {
            return function() {//闭包
                console.log(num);
            }
        }(i);//使用匿名函数，并立即调用
    }
    return result;
}

var result = createFunctions();
for (var i = 0; i < 10; i++) {
    result[i]();
}
