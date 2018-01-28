'use strict';
let str = require("./base64txt");
console.log(str.length);
let buffer = Buffer.from(str, 'base64')
console.log(buffer.length);
