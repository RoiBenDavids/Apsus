const { Link, withRouter } = ReactRouterDOM
function _MailPreview({ mail, toggleStar }) {

    const style = mail.isRead ? 'mail-preview flex ' : 'mail-preview flex  unread'
    const starStyle= mail.isStarred?'far fa-star':'fas fa-star'

    return (
        <li className={style}>

            <i className={starStyle} onClick={()=>toggleStar(mail.id)}></i>
            <Link to={`/mail/${mail.id}`} className={'preview-content flex justify-between'}>
                <p>{mail.from}</p>
                <p>{mail.subject}</p>
                <p>{mail.sentAt}</p>
            </Link>
        </li>
    )
}
export const MailPreview = withRouter(_MailPreview)