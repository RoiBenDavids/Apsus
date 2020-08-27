const { Link, withRouter } = ReactRouterDOM
function _MailPreview({ mail, toggleStar,onCheck, checkedItems }) {

    const style = mail.isRead ? 'mail-preview flex ' : 'mail-preview flex  unread'
    const starStyle = mail.isStarred ? 'far fa-star' : 'fas fa-star'
    function checkBoxEv(ev){
        onCheck(ev.target.value,ev.target.checked)
    }
    function isSelected(mailId){
        // console.log(checkedItems);
        // console.log(mailId, 'is sr');
        const isSelected = checkedItems.find(item=>item===mailId)
        if(isSelected) return true
        return false

    }

    return (
        <li className={style}>

            <div>
                <input onChange={checkBoxEv} type='checkbox'  name='checked' value={mail.id} checked={isSelected(mail.id)} />
                <i className={starStyle} onClick={() => toggleStar(mail.id)}></i>
            </div>

            <Link to={`/mail/${mail.id}`} className={'preview-content flex justify-between'}>
                <p>{mail.from}</p>
                <p>{mail.subject}</p>
                <p>{transformTimeStamp(mail.sentAt)}</p>
            </Link>
        </li>
    )
}
export const MailPreview = withRouter(_MailPreview)