// Generated by CoffeeScript 1.7.1
(function() {
  process.on('message', function(m) {
    return console.log("CHILD got message:", m);
  });

  process.send({
    foo: 'bar'
  });

}).call(this);