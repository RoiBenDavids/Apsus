import { LongText } from "../../cmps/LongText.jsx"
const { Link } = ReactRouterDOM
export function MailPreview({ mail, toggleStar, onCheck, checkedItems, windowWidth,mailToPreview, displayMail}) {

    const style = mail.isRead ? 'mail-preview flex ' : 'mail-preview flex  unread'
    const starStyle = mail.isStarred ? 'far fa-star' : 'fas fa-star'
    console.log(displayMail);
    
    function checkBoxEv(ev) {
        onCheck(ev.target.value, ev.target.checked)
    }
    function isSelected(mailId) {
        const isSelected = checkedItems.find(item => item === mailId)
        if (isSelected) return true
        return false

    }

    return (
        <React-fragment>
        <li className={style}>

            <div className={'flex align-center'}>
                <input onChange={checkBoxEv} type='checkbox' name='checked' value={mail.id} checked={isSelected(mail.id)} />
                <i className={starStyle} onClick={() => toggleStar(mail.id)}></i>
            </div>

            {/* <Link to={`/mail/${mail.id}`} className={'preview-content flex align-center'}> */}
            <div className={'preview-content flex align-center'} onClick={()=>mailToPreview(mail.id)}>
                <div className='name-circle flex justify-center align-center'>{mail.from.substring(0, 2)}</div>
                <p>{mail.username}</p>
                <LongText subject={mail.subject} body={mail.body} windowWidth={windowWidth}/>
                <p>{transformTimeStamp(mail.sentAt)}</p>
            </div>
            {/* </Link> */}
        </li>
        
        {displayMail===mail.id && <li> hi</li>}

        </React-fragment>
    )
}
