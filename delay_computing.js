function add(m) {
    return function(n) { return m + n }
}

var wait_another_arg = add(20);
var a = function(arr) {
    var ret = 0;
    for (var i = 0; i < arr.length; i++)
        ret += arr[i];
    return ret;
}([1,2,3,4]);

var b = wait_another_arg(a);
console.log(b);
