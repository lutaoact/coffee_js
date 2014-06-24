var emitter = new (require('events').EventEmitter);
emitter.on('event1', function(func) {
    func('no err', 'hello world');
});
emitter.emit('event1', function(err, res) {
    console.log(err, res);
});

emitter.on('event2', function(message) {
    console.log(message);
});
emitter.emit('event2', 'hello world');
