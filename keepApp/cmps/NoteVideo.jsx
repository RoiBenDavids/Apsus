import { NoteControlers } from './NoteControlers.jsx'
export class NoteVideo extends React.Component {

    state={
        txt:this.props.note.info.title
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    handleSubmit = () => {
        event.preventDefault();
        var txt = this.state.txt
        this.props.onEdit(txt, this.props.note.id)
    }


    render() {


        return (
            <div style={{ backgroundColor: `${this.props.note.color}` }} className='keep-note'>
                {this.props.note.isPinned && <img className='pin' src="http://www.pngall.com/wp-content/uploads/4/Red-Pin-PNG.png" alt=""/>}
                <form onSubmit={this.handleSubmit}>
                    <input className='note-title' value={this.state.txt} type="text" placeholder="Note title"
                        onChange={this.handleChange} />
                </form>

                <iframe width="300" height="250" src={this.props.note.info.url}></iframe>
                <NoteControlers onEdit={this.props.onEdit}
                 onChangeColor={this.props.onChangeColor} 
                 onChangePinned={this.props.onChangePinned}
                  onDelete={this.props.onDelete} 
                  noteId={this.props.note.id}
                  onShare={this.props.onShare} />
            </div>
        )
    }
}


