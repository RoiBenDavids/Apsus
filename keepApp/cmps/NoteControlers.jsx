import { Color } from './Color.jsx'
export class NoteControlers extends React.Component{

    state={
        isColorShown:false
    }

    
    
    
    
    
    
    render() {
        return (
            <div>

            <div className="note-controler flex justify-around">
                <button onClick={()=>this.props.onDelete(this.props.noteId)}><i className="fas fa-trash"></i></button>
                <button onClick={()=>{this.setState({isColorShown:!this.state.isColorShown})}}><i className="fas fa-palette"></i></button>
                <button onClick={()=>this.props.onChangePinned(this.props.noteId)}><i className="fas fa-thumbtack"></i></button>
                <button onClick={()=>{this.props.onEdit(this.props.noteId)}}><i className="fas fa-edit"></i></button>
            </div>
                {this.state.isColorShown && <Color noteId={this.props.noteId} onChangeColor={(noteId, color)=>this.props.onChangeColor(noteId, color)}/>}
            </div>
    
        )
    }

}

// export class KeepApp extends React.Component {

//     state = {
//         notes: []
//     }

//     componentDidMount() {
//         this.loadNotes();
//     }

//     loadNotes = () => {
//         keepService.query()
//             .then(notes => {
//                 console.log(notes);
//                 console.log(this)
//                 this.setState({ notes })
//             })
//     }

//     onDelete = (noteId) => {
//         keepService.remove(noteId);
//         this.loadNotes();
//     }

//     onChangePinned = (noteId) => {
//         keepService.changePinned(noteId);
//         this.loadNotes();
//     }




//     render() {
//         return (
//             <section>
//                 {this.state.notes.map(note => <NotePreview key={note.id} note={note} onChangePinned={this.onChangePinned} onDelete={this.onDelete} />)}
//             </section>
//         )
//     }
// }