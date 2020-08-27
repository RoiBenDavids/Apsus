export const mailService = {
    query,
    createMail,
    getMailById,
    deleteMail,
    markAsRead,
    toggleStar
}

var mails = [
    {
        id: makeId(),
        from:'moshiko@yahoo.com',
        subject: 'Blabla',
        body: 'yes and no are both answers',
        isRead: false,
        sentAt: Date.now(),
        isStarred:true
    },
    {
        id: makeId(),
        from:'YaroniPoni@walla.com',
        subject: 'Blabla222',
        body: 'yes and no are both answers balbal',
        isRead: false,
        sentAt: Date.now(),
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

function toggleStar(mailId){
    const mailIdx= getIdxById(mailId)
    mails[mailIdx].isStarred=!mails[mailIdx].isStarred;

}