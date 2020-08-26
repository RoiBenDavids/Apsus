export function MailPreview({ mail }) {

    const style= mail.isRead?'mail-preview flex justify-between':'mail-preview flex justify-between unread'

    return (
        <li className={style}>
            <p>{mail.subject}</p>
            <p>{mail.body}</p>
            <p>{mail.sentAt}</p>
        </li>
    )
}