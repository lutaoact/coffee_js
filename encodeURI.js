'use strict';
var results = [];

var encodeURIArray = [], encodeURIComponentArray = [], differenceArray = [];
for (var i = 0; i < 256; i++) {
  var char = String.fromCharCode(i);
  if (!(/[a-z0-9]/i.test(char))) {
    if (encodeURI(char) === char) {
      encodeURIArray.push(char);
    }
    if (encodeURIComponent(char) === char) {
      encodeURIComponentArray.push(char);
    }
    if (encodeURI(char) !== encodeURIComponent(char)) {
      differenceArray.push(char);
    }
  }
}
console.log("encodeURI won't encode:", encodeURIArray.join(''));
console.log("encodeURIComponent won't encode:", encodeURIComponentArray.join(''));
console.log("encodeURIComponent will encode and encodeURI won't encode:", differenceArray.join(''));
