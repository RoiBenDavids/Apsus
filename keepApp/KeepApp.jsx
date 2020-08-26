import { keepService } from './services/keep-service.js'
import { NotePreview } from './cmps/NotePreview.jsx'
export class KeepApp extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        keepService.query()
            .then(notes => {
                console.log(notes);
                console.log(this)
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




    render() {
        return (
            <section>
                {this.state.notes.map(note => <NotePreview key={note.id} note={note} onChangePinned={this.onChangePinned} onDelete={this.onDelete} />)}
            </section>
        )
    }
}