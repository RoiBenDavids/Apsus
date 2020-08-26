// export const utils = {
//     makeId
// }

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getColor() {
    var colors = [
        '#ea5455',
        '#8fc0a9',
        '#8675a9',
        '#ffc1fa',
        '#ede682',
        '#ffa931',
        '#12cad6',
        '#c70039'
    ];

    var idx=getRandomIntInclusive(0, 7)
    return colors[idx];
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

