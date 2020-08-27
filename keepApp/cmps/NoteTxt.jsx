import { NoteControlers } from './NoteControlers.jsx'
export class NoteTxt extends React.Component {

    state={
        txt:this.props.note.info.txt
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    handleSubmit= ()=>{
        var txt=this.state.txt
        console.log(txt);
        this.props.onEdit(txt,this.props.note.id)
    }


    render() {
        return (
            <div style={{ backgroundColor: `${this.props.note.color}` }} className='keep-note' >

                {this.props.note.isPinned && <h1>pinned</h1>}

                <form onSubmit={this.handleSubmit}>
                <input value={this.state.txt} type="text" placeholder="Note title"
                    onChange={this.handleChange} />
                </form>
                <h1>{this.props.note.info.txt}</h1>
                <NoteControlers onEdit={this.props.onEdit} onChangeColor={this.props.onChangeColor} onChangePinned={this.props.onChangePinned} onDelete={this.props.onDelete} noteId={this.props.note.id} />
            </div>

        )
    }
}

// export class NoteControlers extends React.Component {

//     state = {
//         isColorShown: false
//     }







//     render() {
//         return (
//             <div>

//                 <div className="note-controler flex justify-around">
//                     <button onClick={() => this.props.onDelete(this.props.noteId)}><i className="fas fa-trash"></i></button>
//                     <button onClick={() => { this.setState({ isColorShown: !this.state.isColorShown }) }}><i className="fas fa-palette"></i></button>
//                     <button onClick={() => this.props.onChangePinned(this.props.noteId)}><i className="fas fa-thumbtack"></i></button>
//                     <button onClick={() => { this.props.onEdit(this.props.noteId) }}><i className="fas fa-edit"></i></button>
//                 </div>
//                 {this.state.isColorShown && <Color noteId={this.props.noteId} onChangeColor={(noteId, color) => this.props.onChangeColor(noteId, color)} />}
//             </div>

//         )
//     }