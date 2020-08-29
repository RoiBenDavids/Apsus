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

    var idx = getRandomIntInclusive(0, 7)
    return colors[idx];
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function transformTimeStamp(timeStamp) {
    const today = new Date().setHours(0, 0, 0, 0);
    const thisYear = new Date().getFullYear()
    const dayToCHeck = new Date(timeStamp).setHours(0, 0, 0, 0);
    const date = new Date(timeStamp)
    if (today === dayToCHeck) {
        const hours = date.getHours()
        let minutes = date.getMinutes()
        minutes = minutes < 10 ? 0 + '' + minutes : minutes;
        return hours + ':' + minutes
    }
    else if (date.getFullYear() === thisYear) {
        const month = monthToName(date.getMonth())
        const dateV = date.getDate()
        return month + ' ' + dateV
    }
    else {
        const year = date.getFullYear()
        const month = monthToName(date.getMonth())
        const dateV = date.getDate()
        return month + ' ' + dateV + ' ' + year
    }
}

function monthToName(month) {
    switch (month) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
    }
}
