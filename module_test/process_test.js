var count = 0;

var numIterations = 100;
while(numIterations--) {
  process.nextTick(function() {
    count = count + 1;
  });
}

setTimeout(function() {

  console.log(count);

}, 2);
