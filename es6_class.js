'use strict';

//Class不存在变量提升（hoist）

let methodName = 'minus';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  [methodName]() {
    return Math.abs(this.x - this.y);
  }
}

console.log(typeof Point);
console.log(Point.prototype.constructor === Point);
console.log(Point.name);

let p = new Point(1, 2);
console.log(p.constructor === Point);
console.log(p.toString());
console.log(p.minus());

/*
ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
 */
