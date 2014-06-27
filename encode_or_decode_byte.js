for (var i = 0; i < 256; i++) {
    if (i !== decode_byte(encode_byte(i))) {
        console.log(i, encode_byte(i), decode_byte(encode_byte(i)), 'wrong');
    }
    console.log(i, encode_byte(i), decode_byte(encode_byte(i)));
}

function encode_byte(b) {
    return (b & 1 << 7) >> 7 | (b << 1 & 0xff);
}

function decode_byte(b) {
    return (((1 & b) << 7) | (b & 0xff) >> 1);
}
