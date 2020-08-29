import { mailService } from "../services/mail-service.js"
const { Link, Route } = ReactRouterDOM

export class MailDetail extends React.Component {
    state = {
        menuBtns: false

    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        mailService.getMailById(this.props.match.params)
            .then(mail => {
                const { prevMailId, nextMailId } = mailService.getNextPrev(mail.id)
                this.setState({ mail, prevMailId, nextMailId })
                this.markAsRead()
            })
    }

    redirect = (to) => {
        this.loadMail()
    }

    deleteMail = () => {
        this.props.cb(this.state.mail.id)
    }

    markAsRead = () => {
        mailService.markAsRead(this.state.mail.id)
    }

    sendToNotes = () => {
        this.props.history.push(`/keep?subject=${this.state.mail.subject}&body=${this.state.mail.body}`)
    }

    togleMenu = () => {
        this.setState({ menuBtns: !this.state.menuBtns })
    }

    render() {
        const styleMenu = this.state.menuBtns ? 'flex justify-between mail-detail-icons menu-btns-active' : 'flex justify-between mail-detail-icons'
        if (!this.state.mail) return <div></div>
        return (
            <section className={'mail-list mail-details'}>
                <div className='mail-list-header flex justify-between'>
                    <h1>{this.state.mail.subject}</h1>
                    <Link to='/mail'><i className="fas fa-undo-alt"></i></Link>
                    <i onClick={() => this.togleMenu()} className="fas fa-ellipsis-h elipsis "></i>
                    <div className={styleMenu}>
                        <Link onClick={() => this.redirect(this.state.prevMailId)} to={`/mail/${this.state.prevMailId}`}><i className="fas fa-angle-left"></i></Link>
                        <Link onClick={() => this.redirect(this.state.nextMailId)} to={`/mail/${this.state.nextMailId}`}><i className="fas fa-angle-right"></i></Link>
                        <i onClick={() => this.sendToNotes()} className="fas fa-share-square"></i>
                        <Link to={'/mail'}> <p onClick={() => this.deleteMail()}><i className="fas fa-trash"></i></p> </Link>
                    </div>
                </div>
                <div className=' flex justify-between'>
                    <div className='mail-details-from flex'>
                        <h1>{this.state.mail.username}</h1>
                        <p>{'<' + this.state.mail.from + '>'}</p>
                    </div>
                    <h1>{transformTimeStamp(this.state.mail.sentAt)}</h1>
                </div>
                <p>{this.state.mail.body}</p>
            </section>
        )
    }
}