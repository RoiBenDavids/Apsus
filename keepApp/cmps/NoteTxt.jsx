import { NoteControlers } from './NoteControlers.jsx'
export class NoteTxt extends React.Component {

    state = {
        txt: this.props.note.info.txt
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    handleSubmit = () => {
        event.preventDefault();
        var txt = this.state.txt
        this.props.onEdit(txt, this.props.note.id)
    }

    getRows = () => {
        var txt = this.state.txt.split('');
        var rows = Math.floor(txt.length / 20) + 2;
        return rows + ''

    }

    getPinClass = () => {
        let pinClass = (this.props.note.isPinned) ? 'pin' : 'pin unshown';
        return pinClass
    }

    render() {
        return (
            <div style={{ backgroundColor: `${this.props.note.color}` }} className='keep-note' >
                <img className={this.getPinClass()} src="http://www.pngall.com/wp-content/uploads/4/Red-Pin-PNG.png" alt="" />
                <form onSubmit={this.handleSubmit}>
                    <textarea rows={this.getRows()} className='note-title' value={this.state.txt} type="text" placeholder="Note title"
                        onChange={this.handleChange} />
                </form>
                <NoteControlers onEdit={this.props.onEdit}
                    onChangeColor={this.props.onChangeColor}
                    onChangePinned={this.props.onChangePinned}
                    onDelete={this.props.onDelete}
                    noteId={this.props.note.id}
                    onShare={this.props.onShare}
                    txt={this.state.txt} />
            </div>

        )
    }
}
