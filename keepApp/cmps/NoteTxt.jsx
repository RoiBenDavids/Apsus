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

                {this.props.note.isPinned && <h1>📌</h1>}

                <form onSubmit={this.handleSubmit}>
                <input className='note-title' value={this.state.txt} type="text" placeholder="Note title"
                    onChange={this.handleChange} />
                </form>
                
                <NoteControlers onEdit={this.props.onEdit} onChangeColor={this.props.onChangeColor} onChangePinned={this.props.onChangePinned} onDelete={this.props.onDelete} noteId={this.props.note.id} />
            </div>

        )
    }
}
