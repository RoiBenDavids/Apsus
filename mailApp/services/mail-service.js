export const mailService = {
    query,
    createMail,
    getMailById,
    deleteMail
}

var mails = [
    {
        id: makeId(),
        from:'moshiko@yahoo.com',
        subject: 'Blabla',
        body: 'yes and no are both answers',
        isRead: false,
        sentAt: Date.now()
    },
    {
        id: makeId(),
        from:'YaroniPoni@walla.com',
        subject: 'Blabla222',
        body: 'yes and no are both answers balbal',
        isRead: false,
        sentAt: Date.now()
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
        sentAt: Date.now()
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
    console.log('hiii');

}