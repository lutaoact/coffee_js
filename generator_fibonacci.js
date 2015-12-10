'use strict';

function* fibonacci() { // a generator function
//    let [prev, curr] = [0, 1];
    let prev = 0, curr = 1;
    while (true) {
        let tmp = prev + curr;
        prev = curr;
        curr = tmp;
//        [prev, curr] = [curr, prev + curr];
        yield tmp;
    }
}

for (let n of fibonacci()) {
    console.log(n);
    // truncate the sequence at 1000
    if (n >= 1000) {
        break;
    }
}
