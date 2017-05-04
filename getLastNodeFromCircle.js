'use strict';

/*
 * n个人，围成一圈，编号从1到n。从编号为1的人开始报数，每次报到3的人，离开，报到最后，剩下的那个人是编号是几？
 */
function Node(value) {
  this.next = null;
  this.value = value;
}

function buildCircle(n) {
  let head = new Node(1);
  let current = head;
  for (let i = 2; i <= n; i++) {
    let p = new Node(i);
    current.next = p;
    current = p;
  }
  current.next = head;
  return head;
}

function getResult(n) {
  let head = buildCircle(n);
  let current = head;
  let prev = null;
  for (let i = 1; ; i++) {
    if (current.next === current) return current.value;
    if (i % 3 === 0) {
      prev.next = current.next;
    }
    prev = current;
    current = current.next;
  }
}

console.log(getResult(8));
