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

var mails = [
    {
        id: makeId(),
        from:'moshiko@yahoo.com',
        subject: 'vey important notice',
        body: 'yes and no are both answers',
        isRead: false,
        sentAt: Date.now(),
        isStarred:false
    },
    {
        id: makeId(),
        from:'YaroniPoni@walla.com',
        subject: 'you are the best',
        body: 'I just wanted to inform you that you are the best',
        isRead: false,
        sentAt: Date.now(),
        isStarred: false
    },
    {
        id: makeId(),
        from:'LDonchich@walla.com',
        subject: 'come play with us',
        body: 'I would like to invite you to play with us in the mavs team, we will send you all the gear and the plane tickets, see you soon, love luca magic',
        isRead: false,
        sentAt: 50000005318,
        isStarred: false
    },
    {
        id: makeId(),
        from:'OsamaBenLaden@walla.com',
        subject: 'are you free next winter?',
        body: 'we have some new operations coming soon, let me know if you are interested taking part with us',
        isRead: false,
        sentAt: 500,
        isStarred: false
    }
]


function query() {
    return Promise.resolve(mails)
}
function createMail(subject, body) {
    mails.unshift({
        id: makeId(),
        from:'Me',
        subject,
        body,
        isRead:false,
        sentAt: Date.now(),
        isStarred:false
    })
}


function getMailById(mailId){
   const idx= mails.findIndex(mail=>{
    return mail.id==mailId.mailId
   })
    return Promise.resolve(mails[idx])
}

function deleteMail(mailId){
    mails = mails.filter(mail => mail.id !== mailId)
}

function getIdxById(mailId){
    return mails.findIndex(mail=>{
        return mail.id==mailId})

}

function markAsRead(mailId){
    const mailIdx= getIdxById(mailId)
    mails[mailIdx].isRead=true;
}
function markAsUnRead(mailId){
    const mailIdx= getIdxById(mailId)
    mails[mailIdx].isRead=false;
}

function toggleStar(mailId){
    const mailIdx= getIdxById(mailId)
    mails[mailIdx].isStarred=!mails[mailIdx].isStarred;

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