export const mailService = {
    query,
    createMail,
    getMailById,
    deleteMail,
    markAsRead,
    markAsUnRead,
    toggleStar,
    getNextPrev
}

var mailsi = [
    {
        id: makeId(),
        from: 'Petermoshiko@yahoo.com',
        username: 'Peter',
        subject: 'vey important notice',
        body: 'yes and no are both answers',
        isRead: true,
        sentAt: Date.now(),
        isStarred: false
    },
    {
        id: makeId(),
        from: 'CssGod@css.bg',
        username: 'Vivi',
        subject: 'How to CSS',
        body: `If you would have taken your time at the beggining to think about the layout it would have been much easier to 
        build this app, learn from your mistakes, the CSS god`,
        isRead: false,
        sentAt: Date.now(),
        isStarred: false
    },
    {
        id: makeId(),
        from: 'YaroniPoni@walla.com',
        username: 'Yaroni',
        subject: 'Frozen jeans',
        body: 'Hi Roi, did you get your jeans out of the freezer?',
        isRead: true,
        sentAt: Date.now(),
        isStarred: true
    },
    {
        id: makeId(),
        from: 'Abubu@walla.com',
        username: 'abed',
        subject: 'Oriental Cooking',
        body: `Hello Or , regarding the cooking course that you were intrested,
        it will be starting next week, the price is as said $5000 and we will teach you all of our
        great traditions and cooking secrets, looking forward to see you, best regards, abed`,
        isRead: false,
        sentAt: Date.now() - 15000000,
        isStarred: false
    },
    {
        id: makeId(),
        from: 'ziso@walla.com',
        username: 'zohar ziso',
        subject: 'marketing',
        body: `Hi, I would like to invete you to our new marketing course that will take part next month in Bet-Lehem, we will learn a
        lot of usefull ways to market and sell whatever you can think about, the course is for males strickly`,
        isRead: false,
        sentAt: Date.now() - 115900000,
        isStarred: false
    },
    {
        id: makeId(),
        from: 'LDonchich@walla.com',
        username: 'LucaD',
        subject: 'come play with us',
        body: 'I would like to invite you to play with us in the mavs team, we will send you all the gear and the plane tickets, see you soon, love luca magic',
        isRead: false,
        sentAt: 50000005318,
        isStarred: true
    },
    {
        id: makeId(),
        from: 'OsamaBenLaden@walla.com',
        username: 'OsamaBL',
        subject: 'are you free next winter?',
        body: 'we have some new operations coming soon, let me know if you are interested taking part with us',
        isRead: false,
        sentAt: 500,
        isStarred: false
    }
];

const KEY_STORAGE = 'mailsService';

var mails = loadFromStorage(KEY_STORAGE)
if (!mails) {
    mails = mailsi;
    saveToStorage(KEY_STORAGE, mails);
}

function query() {
    return Promise.resolve(mails)
}

function createMail(subject, body) {
    mails.unshift({
        id: makeId(),
        from: 'wethebest@apsus.gr',
        username: 'Me',
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        isStarred: false
    })
    saveToStorage(KEY_STORAGE, mails);
}

function getMailById(mailId) {
    const idx = mails.findIndex(mail => {
        return mail.id == mailId.mailId
    })
    return Promise.resolve(mails[idx])
}

function deleteMail(mailId) {
    mails = mails.filter(mail => mail.id !== mailId)
    saveToStorage(KEY_STORAGE, mails);
}

function getIdxById(mailId) {
    return mails.findIndex(mail => {
        return mail.id == mailId
    })
}

function markAsRead(mailId) {
    const mailIdx = getIdxById(mailId)
    mails[mailIdx].isRead = true;
    saveToStorage(KEY_STORAGE, mails);
}

function markAsUnRead(mailId) {
    const mailIdx = getIdxById(mailId)
    mails[mailIdx].isRead = false;
    saveToStorage(KEY_STORAGE, mails);
}

function toggleStar(mailId) {
    const mailIdx = getIdxById(mailId)
    mails[mailIdx].isStarred = !mails[mailIdx].isStarred;
    saveToStorage(KEY_STORAGE, mails);
}

function getNextPrev(mailId) {
    const mailIdx = getIdxById(mailId)
    const nextMail = mails[mailIdx + 1] || mails[0]
    const prevMail = mails[mailIdx - 1] || mails[mails.length - 1]
    return {
        prevMailId: prevMail.id,
        nextMailId: nextMail.id
    }
}