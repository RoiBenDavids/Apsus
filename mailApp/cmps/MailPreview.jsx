const { Link,withRouter } = ReactRouterDOM
function _MailPreview({ mail }) {

    const style = mail.isRead ? 'mail-preview flex justify-between' : 'mail-preview flex justify-between unread'

    return (
        <Link to={`/mail/${mail.id}`}>
            <li className={style}>
                <p>{mail.from}</p>
                <p>{mail.subject}</p>
                <p>{mail.sentAt}</p>
            </li>
        </Link>
    )
}
export const MailPreview = withRouter(_MailPreview)