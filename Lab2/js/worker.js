onmessage = (value) => {
    if (value.data.value != null && value.data.value != NaN && value.data.value != undefined) {
        let result = '';
        if (value.data.op === 'b2d') {
            result += bin2dec(value.data.value);
        } else {
            result += dec2bin(value.data.value);
        }
        postMessage(result);
    }
}

function bin2dec(value) {
    return parseInt(value, 2).toString(10);
}

function dec2bin(value) {
    return parseInt(value, 10).toString(2);
}