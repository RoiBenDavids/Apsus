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




    render() {
        return (
            <section >
                {this.state.notes.map(note => <NotePreview key={note.id} note={note} onChangeColor={this.onChangeColor} onChangePinned={this.onChangePinned} onDelete={this.onDelete} />)}
            </section>
        )
    }
}