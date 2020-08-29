import { mailService } from "../mailApp/services/mail-service.js"
import { MailList } from "../mailApp/cmps/MailList.jsx"
import { MailCompose } from "../mailApp/cmps/MailCompose.jsx"
import { MailDetail } from "./cmps/MailDetail.jsx"
import eventBus from '../services/event-bus-service.js'
// import {  } from "../lib/react-router-dom.min.js"
const { Route, Switch, Link } = ReactRouterDOM


export class MailApp extends React.Component {
    state = {
        mails: [],
        isCompose: false,
        filterBy: '',
        checkedItems: [],
        mobileSideOpen: false,
        noteToCompose: {},
        displayMail:''
    }

    componentDidMount() {
        const filterBy = new URLSearchParams(this.props.location.search).get('filterBy') || ''
        const body = new URLSearchParams(this.props.location.search).get('body') || ''
        const subject = new URLSearchParams(this.props.location.search).get('subject') || ''
        const searchInput = new URLSearchParams(this.props.location.search).get('searchInput') || ''
        if (searchInput) this.setState({ searchInput: { input: searchInput } })
        this.unsubscribe = eventBus.on('search', (data) => {
            if (data.input) {
                this.props.history.push(`/mail?filterBy=search&searchInput=${data.input}`)
                this.setState({ filterBy: 'search', searchInput: data })
            }
            else{
                this.props.history.push(`/mail`)
                this.setState({ filterBy:'' })
            }
        })
        if (subject && body) this.addNoteToCompose(subject, body)
        this.setState({ filterBy,windowWidth:window.innerWidth })
        this.loadMail()
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    loadMail = () => {
        const mails = mailService.query()
            .then(mails => this.setState({ mails }))

    }
    mailsToRender() {
        if (!this.state.filterBy) return this.state.mails
        const input =this.state.searchInput? this.state.searchInput.input.toLowerCase():''
        if (this.state.filterBy === 'search') {
            const mailsToRender = this.state.mails.filter(mail => {
                if (mail.from.toLowerCase().includes(input)||
                mail.body.toLowerCase().includes(input)||
                mail.subject.toLowerCase().includes(input)) return mail
            })
            return mailsToRender
        }else if(this.state.filterBy === 'sent'){
            const mailsToRender = this.state.mails.filter(mail => {
                if (mail.username==='Me') return mail
            })
            return mailsToRender}
        const mailsToRender = this.state.mails.filter(mail => mail[this.state.filterBy] === false)
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
        if (this.state.filterBy === filter) {
            this.props.history.push(`/mail`)
            this.setState({ filterBy: '' })
        }
        else {
            this.props.history.push(`/mail?filterBy=${filter}`)
            this.setState({ filterBy: filter })
        }
    }

    toggleStar = (mailId) => {
        mailService.toggleStar(mailId);
        this.loadMail()
    }
    checkBoxHandler = (mailId, status) => {
        let checkedItems = this.state.checkedItems;
        if (status) {
            checkedItems.push(mailId)
            this.setState({ checkedItems })
        }
        else {
            const removeIdx = checkedItems.findIndex(item => item === mailId)
            checkedItems.splice(removeIdx, 1)
            this.setState({ checkedItems })
        }
    }
    markAsRead = (mailId) => {
        mailService.markAsRead(mailId)
        this.loadMail()
    }
    markAsUnRead(mailId) {
        mailService.markAsUnRead(mailId)
        this.loadMail()

    }
    handleListBtns = (handler) => {
        switch (handler) {
            case 'trash': this.state.checkedItems.forEach(item => this.onDeleteMail(item));
                break;
            case 'read': this.state.checkedItems.forEach(item => this.markAsRead(item))
                break;
            case 'unread': this.state.checkedItems.forEach(item => this.markAsUnRead(item));
        }
    }
    toggleSelectAll = (value) => {
        if (value) {
            const checkedItems = this.state.mails.map(mail => mail.id)
            this.setState({ checkedItems })
        }
        else {
            this.setState({ checkedItems: [] })
        }
    }

    toggleMenueBar = () => {
        this.setState({ mobileSideOpen: !this.state.mobileSideOpen })
    }

    addNoteToCompose(subject, body) {
        this.toggleCompose()
        this.setState({ noteToCompose: { subject, body } })
    }
    mailToPreview=(mailId)=>{
        if(mailId===this.state.displayMail){
            this.setState({displayMail:''})
            return
        }
        this.setState({displayMail:mailId})
        this.markAsRead(mailId)
    }



    render() {
        const mails = this.mailsToRender()
        return (
            <section className={'mail-app flex'}>
                <div className={'side-bar flex column'}>

                    <div className='compose flex align-center' onClick={() => this.toggleCompose()}>compose</div>
                    <div className={this.state.mobileSideOpen ? 'mobile-side-open side-bar-btns' : 'side-bar-btns'}>
                        <p className={!this.state.filterBy ? 'active' : ''} onClick={() => this.filterBy('')} ><i className="fas fa-inbox"></i>inbox</p>
                        <p className={this.state.filterBy === 'isRead' ? 'active' : ''} onClick={() => this.filterBy('isRead')} ><i className="fas fa-envelope-open"></i>Unread</p>
                        <p className={this.state.filterBy === 'isStarred' ? 'active' : ''} onClick={() => this.filterBy('isStarred')}><i className='fas fa-star'></i>Starred</p>
                        <p className={this.state.filterBy === 'sent' ? 'active' : ''} onClick={() => this.filterBy('sent')}><i className=" fas fa-paper-plane"></i>Sent</p>

                    </div>
                </div>
                <Switch>
                    <Route exact path={`/mail/:mailId`} render={props => <MailDetail {...props} cb={this.onDeleteMail} />}>
                    </Route>
                    <Route exact path={'/mail'}>
                        <MailList mails={mails} toggleStar={this.toggleStar} onCheck={this.checkBoxHandler} handleListBtns={this.handleListBtns}
                            toggleSelectAll={this.toggleSelectAll} checkedItems={this.state.checkedItems} openSideBar={this.toggleMenueBar}
                             windowWidth={this.state.windowWidth} mailToPreview={this.mailToPreview} displayMail={this.state.displayMail}
                             markAsRead={this.markAsRead} />
                    </Route>

                </Switch>

                {this.state.isCompose && <MailCompose cb={this.sendMail} toggleCompose={this.toggleCompose} noteToCompose={this.state.noteToCompose} />}
            </section>
        )
    }
}