import { Color } from './Color.jsx'
export class NoteControlers extends React.Component {

    state = {
        isColorShown: false
    }

    colorClose = () => {
        this.setState({ isColorShown: false })
    }

    render() {
        return (
            <div>
                <div className="note-controler flex justify-around">
                    <button onClick={() => this.props.onDelete(this.props.noteId)}><i className="fas fa-trash"></i></button>
                    <button onClick={() => { this.setState({ isColorShown: !this.state.isColorShown }) }}><i className="fas fa-palette"></i></button>
                    <button onClick={() => this.props.onChangePinned(this.props.noteId)}><i className="fas fa-thumbtack"></i></button>
                    <button onClick={() => this.props.onShare(this.props.noteId)}><i className="fas fa-share-square"></i></button>
                    {!this.props.note && <button onClick={() => { this.props.onEdit(this.props.txt, this.props.noteId) }}><i className="far fa-save"></i></button>}
                </div>
                {this.state.isColorShown && <Color noteId={this.props.noteId} colorClose={this.colorClose} onChangeColor={(noteId, color) => this.props.onChangeColor(noteId, color)} />}
            </div>
        )
    }
}

