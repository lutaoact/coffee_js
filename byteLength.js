str = '\u00bd + \u00bc = \u00be';

console.log(str + ": " + str.length + " characters, " +
          Buffer.byteLength(str, 'utf8') + " bytes");

// ½ + ¼ = ¾: 9 characters, 12 bytes
