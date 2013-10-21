function outter(arg1) {
    var free_variable = 3;
    return function inner(arg2) {
        var local_variable = 2;
        return arg1 + arg2 + free_variable + local_variable;
    };
}

var a = outter(1);
var b = a(4);
console.log(b);
