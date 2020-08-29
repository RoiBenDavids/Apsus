import { NoteControlers } from './NoteControlers.jsx'
export class NoteTodos extends React.Component {


    state = {
        txt: ''
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    handleSubmit = () => {
        event.preventDefault;
        this.props.addTodo(this.props.note.id, this.state.txt)
        this.setState({ txt: '' })
    }

    isDone(doneAt) {
        if (!doneAt) return ''
        else return 'done'
    }

    getPinClass = () => {
        let pinClass = (this.props.note.isPinned) ? 'pin' : 'pin unshown'
        return pinClass
    }


    render() {
        return (
            <div style={{ backgroundColor: `${this.props.note.color}` }} className='keep-note'>
                <img className={this.getPinClass()} src="http://www.pngall.com/wp-content/uploads/4/Red-Pin-PNG.png" alt="" />
                <ul>
                    {this.props.note.info.todos.map(todo =>
                        <div key={todo.id} className='todo-preview-line flex justify-between align-center'>
                            <li onClick={() => { this.props.OnDoneAt(this.props.note.id, todo.id) }} className={`todo-note-list ${this.isDone(todo.doneAt)}`} >{todo.txt}</li>
                            <button onClick={() => this.props.removeTodo(this.props.note.id, todo.id)}><i className="fas fa-minus"></i></button>
                        </div>
                    )}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input className='add-note-input' value={this.state.txt} type="text" placeholder='Add new'
                        onChange={this.handleChange} />
                </form>
                <NoteControlers onEdit={this.props.onEdit}
                    onChangeColor={this.props.onChangeColor}
                    onChangePinned={this.props.onChangePinned}
                    onDelete={this.props.onDelete}
                    noteId={this.props.note.id}
                    note={this.props.note}
                    onShare={this.props.onShare} />
            </div>
        )

    }
}
