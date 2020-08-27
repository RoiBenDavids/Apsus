import { mailService } from "../mailApp/services/mail-service.js"
import { MailList } from "../mailApp/cmps/MailList.jsx"
import { MailCompose } from "../mailApp/cmps/MailCompose.jsx"
import { MailDetail } from "./cmps/MailDetail.jsx"
// import {  } from "../lib/react-router-dom.min.js"
const { Route, Switch, Link } = ReactRouterDOM


export class MailApp extends React.Component {
    state = {
        mails: [],
        isCompose: false,
        chosenMail: '',
        filterBy: ''
    }

    componentDidMount() {
        this.loadMail()

    }
    loadMail = () => {
        const mails = mailService.query()
            .then(mails => this.setState({ mails }))

    }
    mailsToRender() {
        if(!this.state.filterBy) return this.state.mails
       var mailsToRender= this.state.mails.filter(mail=>mail[this.state.filterBy]===false)
       return mailsToRender
        
    }

    toggleCompose = () => {
        this.setState({ isCompose: !this.state.isCompose })
    }

    sendMail = (ev, mail) => {
        ev.preventDefault()
        const { to, subject, body } = mail
        mailService.createMail(subject, body)
        this.toggleCompose()
        this.loadMail()
    }
    onDeleteMail = (mailId) => {
        mailService.deleteMail(mailId);
        this.loadMail()
    }

    filterBy = (filter) => {
        if(this.state.filterBy===filter) this.setState({filterBy:''})
       else this.setState({ filterBy: filter })
    }

    toggleStar=(mailId)=>{
        mailService.toggleStar(mailId);
        this.loadMail()
    }



    render() {
        const mails = this.mailsToRender()
        if (!mails[0]) return <div>111</div>
        return (
            <section className={'mail-app flex'}>
                <div className={'side-bar flex column'}>
                
                    <div className='flex align-center' onClick={() => this.toggleCompose()}>compose</div>
                    <p className={!this.state.filterBy?'active':''} onClick={() => this.filterBy('')} >inbox</p>
                    <p className={this.state.filterBy==='isRead'?'active':''} onClick={() => this.filterBy('isRead')} >Unread</p>
                    <p className={this.state.filterBy==='isStarred'?'active':''} onClick={() => this.filterBy('isStarred')}>Starred</p>
                    <p>Sent</p>
                </div>
                <Switch>
                    <Route exact path={'/mail'}>
                        <div className="mail-list ">
                            <MailList mails={mails} toggleStar={this.toggleStar} />
                        </div>
                    </Route>
                    <Route path={`/mail/:mailId`} render={props => <MailDetail {...props} cb={this.onDeleteMail} />}>
                    </Route>

                </Switch>

                {this.state.isCompose && <MailCompose cb={this.sendMail} />}
            </section>
        )
    }
}