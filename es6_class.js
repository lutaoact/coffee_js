'use strict';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

console.log(typeof Point);
console.log(Point.prototype.constructor === Point);

let p = new Point(1, 2);
console.log(p.constructor === Point);
console.log(p.toString());
