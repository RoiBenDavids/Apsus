import { keepService } from './services/keep-service.js'
import { NotePreview } from './cmps/NotePreview.jsx'
import { AddNote } from './cmps/AddNote.jsx'
import eventBus from '../services/event-bus-service.js'
export class KeepApp extends React.Component {

    state = {
        notes: []
    }
  


    

    handleChange = ({ target }) => {
        this.setState({ newTodo: target.value }, () => { console.log(this.state.newTodo) })
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

    onEdit = (txt,noteId) => {
        var editNote = keepService.getById(noteId)
        this.setState({ id: editNote.id, type: editNote.type, })
        switch (editNote.type) {
            case 'NoteText':
                var info={ txt }
                keepService.edit(noteId,info)
                this.loadNotes();
                break;
            // case 'NoteImg':
            //     txt = `${editNote.info.title} ${editNote.info.url}`
            //     break;
            // case 'NoteVideo':
            //     var temps = editNote.info.url.split('/');
            //     txt = `https://www.youtube.com/watch?v=`

            //     break;

            // default:
            //     break;
        }

    }


    handleChange = ({ target }) => {
        this.setState({ txt: target.value }, () => { console.log(this.state.txt); })
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
                this.props.onAddNote(this.state.type, info);
                this.setState({ txt: '', title: '' })
        }

    }



    render() {
        return (
            <section >
                <AddNote onAddNote={this.onAddNote} />
                {this.state.notes.map(note => <NotePreview key={note.id} note={note} onEdit={this.onEdit} onChangeColor={this.onChangeColor} onChangePinned={this.onChangePinned} onDelete={this.onDelete} />)}
            </section>
        )
    }
}