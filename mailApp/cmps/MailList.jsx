import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, toggleStar, onCheck, handleListBtns, toggleSelectAll, checkedItems, openSideBar, windowWidth, mailToPreview, displayMail, markAsRead }) {
    function handleSelectAll(ev) {
        toggleSelectAll(ev.target.checked)
    }

    return (
        <div className="mail-list ">
            <div className={'mail-list-header flex'}>
                <input onChange={handleSelectAll} type='checkbox' name='checkAll' />
                <i onClick={() => handleListBtns('trash')} className="fas fa-trash"></i>
                <i onClick={() => handleListBtns('read')} className="fas fa-envelope-open"></i>
                <i onClick={() => handleListBtns('unread')} className="fas fa-envelope"></i>
                <div onClick={() => openSideBar()} className='mobile-menu'><i className="fas fa-bars"></i></div>
            </div>
            <ul >
                {
                    mails.map(mail => {
                        return <MailPreview key={mail.id} mail={mail} toggleStar={toggleStar} onCheck={onCheck} checkedItems={checkedItems}
                            windowWidth={windowWidth} mailToPreview={mailToPreview} displayMail={displayMail} markAsRead={markAsRead} />
                    })
                }
            </ul>
        </div>
    )
}