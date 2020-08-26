import { MailPreview} from "./MailPreview.jsx"

export function MailList({ mails }) {

    return (
        <ul >
            {
            mails.map(mail =>
                <MailPreview key={mail.id} mail={mail}/>
                )
            }
        </ul>
    )
}