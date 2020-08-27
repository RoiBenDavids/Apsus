import { MailPreview} from "./MailPreview.jsx"

export function MailList({ mails,toggleStar }) {

    return (
        <ul >
            {
            mails.map(mail =>{
                return <MailPreview key={mail.id} mail={mail} toggleStar={toggleStar}  />
            })
            }
        </ul>
    )
}