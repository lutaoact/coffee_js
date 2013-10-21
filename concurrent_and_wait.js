var wait = function(callbacks, done) {
    console.log('wait start');
    var counter = callbacks.length;
    var results = [];
    var next = function(result) {
        results.push(result);
        if (--counter == 0) {
            done(results);
        }
    };
    for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](next);
    }
    console.log('wait end');
};

wait([
    function(next) {
        setTimeout(function() {
            console.log('done a');
            var result = 500;
            next(result);
        }, 500);
    },
    function(next) {
        setTimeout(function() {
            console.log('done b');
            var result = 1000;
            next(result);
        }, 1000);
    },
    function(next) {
        setTimeout(function() {
            console.log('done c');
            var result = 1500;
            next(result);
        }, 1500);
    },
], function(results) {
    var ret = 0;
    for (var i = 0; i < results.length; i++) {
        ret += results[i];
    }
    console.log('done all. result: ' + ret);
});
/*
OUTPUT:
wait start
wait end
done a
done b
done c
done all. result: 3000

wait并不是真的等到所有的函数执行完才结束执行，
而是在所有传给他的函数执行完毕后（不论同步、非同步），
才执行结果的函数（也就是done()）。
*/
