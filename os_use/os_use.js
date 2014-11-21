var os = require('os')
console.log(os.platform());

var nconf = require('nconf');
console.log(nconf.argv().env());
