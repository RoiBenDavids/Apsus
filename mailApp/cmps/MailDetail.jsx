import { mailService } from "../services/mail-service.js"
const { Link } = ReactRouterDOM

export class MailDetail extends React.Component {
    state = {

    }

    componentDidMount() {
        mailService.getMailById(this.props.match.params)
            .then(mail => {
                const { prevMailId, nextMailId } = mailService.getNextPrev(mail.id)
                this.setState({ mail,prevMailId,nextMailId })
                this.markAsRead()
    
                console.log(prevMailId, nextMailId);
            })

    }
    deleteMail = () => {
        this.props.cb(this.state.mail.id)
    }
    markAsRead = () => {
        mailService.markAsRead(this.state.mail.id)

    }

    render() {
        if (!this.state.mail) return <div></div>
        return (
            <section className={'mail-list mail-details'}>
                <div className='flex justify-between'>
                    <h1>{this.state.mail.subject}</h1>
                    <Link to={`/mail/${this.state.prevMailId}`}><i className="fas fa-angle-left"></i></Link>
                    <Link to={`/mail/${this.state.nextMailId}`}><i className="fas fa-angle-right"></i></Link>
                    <Link to={'/mail'}> <p onClick={() => this.deleteMail()}><i className="fas fa-trash"></i></p> </Link>

                </div>
                <div className='flex justify-between'>
                    <h1>{this.state.mail.from}</h1>
                    <h1>{transformTimeStamp(this.state.mail.sentAt)}</h1>

                </div>
                <p>{this.state.mail.body}</p>
            </section>
        )
    }
}