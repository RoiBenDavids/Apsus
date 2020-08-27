import { AddNoteTodos } from './AddNoteTodos.jsx'
export class AddNote extends React.Component {

    state = {
        title: null,
        txt: '',
        type: 'NoteText'
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value }, () => { console.log(this.state.txt); })
    }

    handleSubmit = () => {
        var info = {}
        switch (this.state.type) {
            case "NoteText":
                info = { txt: this.state.txt }
                break;
            case "NoteImg":
                var strs = this.state.txt.split(" ");
                var url = strs.pop();
                if (strs.length > 0) var title = strs.join(' ');
                info = { url, title: (title) ? title : null }
                break;
            case "NoteVideo":
                var strs = this.state.txt.split(" ");
                var url = strs.pop();
                if (strs.length > 0) var title = strs.join(' ');
                url = `https://www.youtube.com/embed/${url.split('watch?v=')[1]}`
                info = { url, title: (title) ? title : null }
                break;

            default:
                break;
        }
        this.props.onAddNote(this.state.type, info);
        this.setState({ txt: '', title: '' })
    }

    addTodo=(todos)=>{
        this.props.onAddNote('NoteTodos', {todos});
    }


    render() {
        return (
            <div className='add-note'>
                {(this.state.type === 'NoteTodos') && <AddNoteTodos addTodo={this.addTodo} />}
                {(this.state.type !== 'NoteTodos') &&
                    <div>

                        <form onSubmit={this.handleSubmit}>
                            <input value={this.state.txt} type="text" placeholder="Add note"
                                onChange={this.handleChange} />
                        </form>

                        <button onClick={() => { this.setState({ type: "NoteImg" }) }}><i className="fas fa-image"></i></button>
                        <button onClick={() => { this.setState({ type: "NoteText" }) }}><i className="fas fa-comment"></i></button>
                        <button onClick={() => { this.setState({ type: "NoteVideo" }) }}><i className="fab fa-youtube"></i></button>
                        <button onClick={() => { this.setState({ type: "NoteTodos" }) }}><i className="fas fa-list"></i></button>
                    </div>
                }
            </div>
        )
    }
}

