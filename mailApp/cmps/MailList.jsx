import { MailPreview} from "./MailPreview.jsx"

export function MailList({ mails,filterBy }) {

    return (
        <ul >
            {
            mails.map(mail =>{
                return <MailPreview key={mail.id} mail={mail} />
            })
            }
        </ul>
    )
}