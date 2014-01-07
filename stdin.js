var stdin = process.openStdin();
stdin.setEncoding('utf8');
stdin.on('data', function(chunk){
    if (chunk.indexOf('yes') !== -1) {
        stdin.destroy();
        process.stdout.write(chunk);
    } else {
        process.stdout.write('Canceled');
        process.exit();
    }
});

/*
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    process.stdout.write('data: ' + chunk);
});

process.stdin.on('end', function() {
    process.stdout.write('end');
});
*/
