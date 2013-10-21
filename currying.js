var accu = 0, count = 10;
for (var i = 0; i < count; i++) {
    setTimeout(
        function(i) {
            return function() {
                count--;
                accu += i;
                if (count <= 0)
                    console.log(accu)
            };
        }(i),
        50
    );
}
