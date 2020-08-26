import { MailPreview} from "./MailPreview.jsx"

export function MailList({ mails, markAsRead }) {

    return (
        <ul >
            {
            mails.map(mail =>
                <MailPreview key={mail.id} mail={mail} />
                )
            }
        </ul>
    )
}