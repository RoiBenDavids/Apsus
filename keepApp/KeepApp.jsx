import { keepService } from './services/keep-service.js'
import { NotePreview } from './cmps/NotePreview.jsx'
import { AddNote } from './cmps/AddNote.jsx'
import eventBus from '../services/event-bus-service.js'
export class KeepApp extends React.Component {

    state = {
        notes: []
    }





    handleChange = ({ target }) => {
        this.setState({ newTodo: target.value })
    }

    componentDidMount() {
        this.loadNotes();
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

    }

    OnDoneAt = (noteId, todoId) => {
        keepService.doneAt(noteId, todoId);
        this.loadNotes();
    }

    removeTodo = (noteId, todoId) => {
        keepService.removeTodo(noteId, todoId);
        this.loadNotes();
    }

    addTodo = (noteId, txt) => {
        keepService.addTodo(noteId, txt);
        this.loadNotes();

    }


    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
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
                    {this.state.notes.map(note => <NotePreview removeTodo={this.removeTodo}
                        key={note.id}
                        OnDoneAt={this.OnDoneAt}
                        note={note}
                        onEdit={this.onEdit}
                        onChangeColor={this.onChangeColor}
                        onChangePinned={this.onChangePinned}
                        addTodo={this.addTodo}
                        onDelete={this.onDelete} />)}
                </div>
            </section>
        )
    }
}