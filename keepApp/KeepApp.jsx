import { keepService } from './services/keep-service.js'
import { NotePreview } from './cmps/NotePreview.jsx'
export class KeepApp extends React.Component {

    state={
        notes:[]
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes() {
        keepService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }
    
    
    
    
    render() {
        return (
            <section>
                <h1>keep</h1>
                {this.state.notes.map(note=><div key={note.id}>
                        <h1>hi</h1>
                        <NotePreview note={note} />
                    </div>

                )}
                
            </section>
        )
    }
}