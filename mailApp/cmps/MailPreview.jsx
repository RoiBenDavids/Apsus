import { LongText } from "../../cmps/LongText.jsx"
import { MailSmallDetail } from "./mailSmallDetail.jsx"
const { Link } = ReactRouterDOM
export function MailPreview({ mail, toggleStar, onCheck, checkedItems, windowWidth,mailToPreview, displayMail ,markAsRead}) {

    const style = mail.isRead ? 'mail-preview flex ' : 'mail-preview flex  unread'
    const starStyle = mail.isStarred ? 'far fa-star' : 'fas fa-star'
    
    function checkBoxEv(ev) {
        onCheck(ev.target.value, ev.target.checked)
    }
    function isSelected(mailId) {
        const isSelected = checkedItems.find(item => item === mailId)
        if (isSelected) return true
        return false

    }
    function getStyle(letter){
        console.log(letter>'j'&&letter<='m');
        let style= 'name-circle flex justify-center align-center ';
        if(letter>='a'&&letter<='e'){
            style+='color1';
        }else if(letter>'e'&&letter<='g'){
            style+='color2'
        }else if(letter>'g'&&letter<='j'){
            style+='color3'
        }else if(letter>'j'&&letter<='m'){
            style+='color4'
        }else if(letter>'m'&&letter<='o'){
            style+='color5'
        }else if(letter>'o'&&letter<='q'){
            style+='color6';
        }else if(letter>'q'&&letter<='u'){
            style+='color7';
        }else style+='color8';
        
        console.log(style);
        return style

    }

    return (
        <React-fragment>
        <li className={style}>

            <div className={'flex align-center'}>
                <input onChange={checkBoxEv} type='checkbox' name='checked' value={mail.id} checked={isSelected(mail.id)} />
                <i className={starStyle} onClick={() => toggleStar(mail.id)}></i>
            </div>

            <div className={'preview-content flex align-center'} onClick={()=>mailToPreview(mail.id)}>
                <div className={getStyle(mail.from.substring(0,1).toLowerCase())}>{mail.from.substring(0, 2)}</div>
                <p>{mail.username}</p>
                <LongText subject={mail.subject} body={mail.body} windowWidth={windowWidth}/>
                <p>{transformTimeStamp(mail.sentAt)}</p>
            </div>
        </li>
        
        {displayMail===mail.id && <MailSmallDetail mail={mail} />}

        </React-fragment>
    )
}
