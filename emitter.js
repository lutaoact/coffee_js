var emitter = new (require('events').EventEmitter);
emitter.on('event1', function(func) {
    process.nextTick(function() {
      func('no err', 'hello world');
    });//异步执行
});
emitter.emit('event1', console.log);

emitter.on('event2', console.log);
emitter.emit('event2', 'hello world');
