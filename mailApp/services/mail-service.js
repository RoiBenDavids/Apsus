export const mailService = {
    query,

}

var mails = [
    {
        id: makeId(),
        subject: 'Blabla',
        body: 'yes and no are both answers',
        isRead: false,
        sentAt: Date.now()
    },
    {
        id: makeId(),
        subject: 'Blabla222',
        body: 'yes and no are both answers balbal',
        isRead: false,
        sentAt: Date.now()
    }
]


function query() {
    return Promise.resolve(mails)
}

// function createMail(mail){
//    const {subject,body}=mail;
//    mails.push({
//        subject,
//        body,
//        isRead=false,
//        sentAt:Date.now()

//    })


// }