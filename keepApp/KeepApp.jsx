import { keepService } from './services/keep-service.js'
import { NotePreview } from './cmps/NotePreview.jsx'
import { AddNote } from './cmps/AddNote.jsx'
import eventBus from '../services/event-bus-service.js'
export class KeepApp extends React.Component {

    state = {
        notes: [],
        filterBy: ''
    }





    handleChange = ({ target }) => {
        this.setState({ newTodo: target.value })
    }

    componentDidMount() {
        this.loadNotes();
        const subject = new URLSearchParams(this.props.location.search).get('subject') || ''
        const body = new URLSearchParams(this.props.location.search).get('body') || ''
        if (subject || body) {
            var info = { txt: body + subject + ' ' }
            this.onAddNote('NoteText', info);
        }
        this.unsubscribe = eventBus.on('filterKeep', (data) => {
            this.setState({ filterBy:data.input })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    filterBy() {
        var { notes, filterBy } = this.state
        if (!filterBy) return notes
        return notes = notes.filter(note => {
            if (note.type === 'NoteImg' || note.type === 'NoteVideo') return note.info.title.includes(filterBy);
            if (note.type === 'NoteText') return note.info.txt.includes(filterBy);
            if (note.type === 'NoteTodos') {
                let todosStrs = note.info.todos.map(todo => todo.txt)
                return todosStrs.join(' ').includes(filterBy);
            }
            return false;
        })

    }

    loadNotes = () => {
        keepService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }

    onDelete = (noteId) => {
        keepService.remove(noteId);
        this.loadNotes();
        eventBus.emit('notify', { msg: 'Note delte', type: 'notification' })
    }

    onChangePinned = (noteId) => {
        keepService.changePinned(noteId);
        this.loadNotes();
    }

    onChangeColor = (noteId, color) => {
        keepService.ChangeColor(noteId, color);
        this.loadNotes();
    }

    onAddNote = (type, info) => {
        keepService.create(type, info);
        this.loadNotes();
        eventBus.emit('notify', { msg: 'Note added', type: 'notification' })
    }

    onEdit = (txt, noteId) => {
        var editNote = keepService.getById(noteId)
        this.setState({ id: editNote.id, type: editNote.type, })
        switch (editNote.type) {
            case 'NoteText':
                var info = { txt }
                keepService.edit(noteId, info)
                this.loadNotes();
                break;
            case 'NoteImg':
            case 'NoteVideo':
                var url = keepService.getById(noteId).info.url
                info = { title: txt, url }
                keepService.edit(noteId, info)
                this.loadNotes();
                break;
        }
        this.loadNotes();
        eventBus.emit('notify', { msg: 'Note edited', type: 'notification' })
    }

    OnDoneAt = (noteId, todoId) => {
        keepService.doneAt(noteId, todoId);
        this.loadNotes();
    }

    removeTodo = (noteId, todoId) => {
        keepService.removeTodo(noteId, todoId);
        this.loadNotes();
        eventBus.emit('notify', { msg: 'Note edited', type: 'notification' })
    }

    addTodo = (noteId, txt) => {
        keepService.addTodo(noteId, txt);
        this.loadNotes();
        eventBus.emit('notify', { msg: 'Note edited', type: 'notification' })

    }


    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    onShare = (noteId) => {
        var note = keepService.getById(noteId)
        var subject = note.type;
        var body = ''
        console.log(subject, body);
        switch (subject) {
            case 'NoteText':
                body = note.info.txt
                break;
            case 'NoteImg':
                body = `${note.info.title} ${note.info.url}`
                break;
            case 'NoteVideo':
                var splitUrl = note.info.url.split('/')
                var url = `https://www.youtube.com/watch?v=${splitUrl[splitUrl.length - 1]}`
                body = `${note.info.title} ${url}`
                break;
            case 'NoteTodos':
                var todosToDisplay = note.info.todos.map(todo => todo.txt)
                var body = todosToDisplay.join(', ');
                break;

            default:
                break;
        }
        // var body = 'hy'
        this.props.history.push(`/mail?subject=${subject}&body=${body}`)
        eventBus.emit('notify', { msg: 'Send to mail', type: 'notification' })
    }

    handleSubmit = () => {
        var info = {}
        switch (this.state.type) {
            case "NoteText":
                info = { txt: this.state.txt }
                break;
            case "NoteImg":
                var strs = this.state.txt.split(" ");
                var url = strs.pop();
                if (strs.length > 0) var title = strs.join(' ');
                info = { url, title: (title) ? title : null }
                break;
            case "NoteVideo":
                var strs = this.state.txt.split(" ");
                var url = strs.pop();
                if (strs.length > 0) var title = strs.join(' ');
                url = `https://www.youtube.com/embed/${url.split('watch?v=')[1]}`
                info = { url, title: (title) ? title : null }
                break;

            default:
                break;
        }

    }



    render() {
        return (
            <section >
                <div className='add-container'>

                    <AddNote onAddNote={this.onAddNote} />
                </div>


                <div className='notes-container'>
                    {this.filterBy().map(note => <NotePreview removeTodo={this.removeTodo}
                        key={note.id}
                        OnDoneAt={this.OnDoneAt}
                        note={note}
                        onEdit={this.onEdit}
                        onChangeColor={this.onChangeColor}
                        onChangePinned={this.onChangePinned}
                        addTodo={this.addTodo}
                        onDelete={this.onDelete}
                        onShare={this.onShare} />)}
                </div>
            </section>
        )
    }
}