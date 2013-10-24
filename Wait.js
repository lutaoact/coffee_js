function Wait(fns, done) {
    var count = 0;
    var results = [];
    this.getCallback = function(index) {
        count++;
        return (function(waitback) {
            return function() {
                var args = [];
                for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                args.push(waitback);
                fns[index].apply(this, args);
            };
        })(function(result) {
            results.push(result);
            if (--count == 0) {
                done(results);
            }
        });
    }
}

var a = new Wait([
    function(waitback) {
        console.log('done a');
        var result = 500;
        waitback(result)
    },
    function(waitback) {
        console.log('done b');
        var result = 1000;
        waitback(result);
    },
    function(waitback) {
        console.log('done c');
        var result = 1500;
        waitback(result);
    }
], function(results) {
    var ret = 0;
    for (var i = 0; i < results.length; i++) {
        ret += results[i];
    }
    console.log('done all. result: ' + ret);
});

var callbacks = [
    a.getCallback(0),
    a.getCallback(1),
    a.getCallback(0),
    a.getCallback(2)
];

setTimeout(callbacks[0], 500);
setTimeout(callbacks[1], 1000);
setTimeout(callbacks[2], 1500);
setTimeout(callbacks[3], 2000);

/*
OUTPUT:
done a
done b
done a
done c
done all. result: 3500
*/
