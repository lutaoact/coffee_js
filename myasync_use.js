myasync = require('myasync');

myasync.mySeries({
  one: function(next) {
    next(null, 'one');
  },
  two: function(next, res) {
    console.log(res);
    next(null, 'two');
  },
  three: function(next, res) {
    console.log(res);
    next(null, 'three');
  },
}, function(err, res) {
  if (err) {
    return console.log(err);
  }
  console.log(res);
});
