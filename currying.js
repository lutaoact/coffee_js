//在计算机科学中，柯里化（Currying），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
var accu = 0, count = 10;
for (var i = 0; i < count; i++) {
  setImmediate((function(i) {
    return function() {
      accu += i;
      console.log(accu);
    };
  })(i));
}

var foo = function(a) {
  return function(b) {
    return a * a + b * b;
  };
};
console.log(foo(3)(4));
