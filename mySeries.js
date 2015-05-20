'use strict';
var async = require('async');

var mySeries = function(tasks, callback) {
  var prev;
  for (var i in tasks) {
    var task = tasks[i];
    if (prev) {
      tasks[i] = [prev, task];
    } else {
      tasks[i] = task;
    }
    prev = i;
  }
  async.auto(tasks, callback);
};

exports.mySeries = mySeries;

/**
mySeries({
  one: function(next) {
    next(null, 'one');
  },
  two: function(next, res) {
    console.log(res);
    next('xxxx', 'two');
  },
  three: function(next, res) {
    console.log(res);
    next(null, 'three');
  },
}, function(err, res) {
  console.log('i am here');
  if (err) {
    return console.log(err);
  }
  console.log(res);
});
**/
