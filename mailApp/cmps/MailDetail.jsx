import { mailService } from "../services/mail-service.js"
const { Link } = ReactRouterDOM

export class MailDetail extends React.Component {
    state = {

    }

    componentDidMount() {
        console.log(this.props.match.params)
        mailService.getMailById(this.props.match.params)
            .then(mail => this.setState({ mail }))

    }
    deleteMail=()=>{
        console.log(this.state.mail.id);
        this.props.cb(this.state.mail.id)
    }

    render() {
        if (!this.state.mail) return <div></div>
        return (
            <section className={'mail-details'}>
                <div className='flex justify-between'>
                    <h1>{this.state.mail.subject}</h1>
                    <Link to={'/mail'}> <p onClick={()=>this.deleteMail()}>delete</p> </Link>

                </div>
                <div className='flex justify-between'>
                    <h1>{this.state.mail.from}</h1>
                    <h1>{this.state.mail.sentAt}</h1>

                </div>
                <h1>{this.state.mail.body}</h1>
            </section>
        )
    }
}