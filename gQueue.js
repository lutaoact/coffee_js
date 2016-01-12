'use strict';
let activeGenerator;

function gNext() {
  return function(err, data) {
    if (err) {
      throw err;
    }
    activeGenerator.next(data);
  };
}

function gQueue(generatorFunc) {
  activeGenerator = generatorFunc(gNext());
  activeGenerator.next();
}

function asyncFunc(num, cb) {
  process.nextTick(function() {
    cb(null, num);
  });
}

gQueue(function* flow(next) {
  console.log('start');

  let y = yield asyncFunc(10, next);

  console.log('y is', y);

  let z = yield asyncFunc(20, next);

  console.log('z is', z);
  console.log('end');
});
