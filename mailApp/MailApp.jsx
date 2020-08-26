import { mailService } from "../mailApp/services/mail-service.js"
import { MailList } from "../mailApp/cmps/MailList.jsx"

export class MailApp extends React.Component {
    state = {
        mails: []
    }

    componentDidMount() {
        const mails = mailService.query()
            .then(mails => this.setState({ mails }))

    }
    mailsToRender() {
        return this.state.mails;
    }

    render() {
        const mails = this.mailsToRender()
        if (!mails[0]) return <div>111</div>
        return (
            <section className={'mail-app flex'}>
                <div className={'side-bar'}>
                    compose mail
                </div>
                <div className="mail-list ">
                    <MailList mails={mails} />
                </div>
            </section>
        )
    }
}