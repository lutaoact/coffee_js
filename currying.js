var accu = 0, count = 10;
for (var i = 0; i < count; i++) {
    setTimeout(
        function(i) {
            console.log(i);
            return function() {
                count--;
                accu += i;
                console.log(accu);
            };
        }(i),
        1
    );
}
