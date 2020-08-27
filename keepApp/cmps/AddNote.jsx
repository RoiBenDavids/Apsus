import { AddNoteTodos } from './AddNoteTodos.jsx'
import eventBus from '../../services/event-bus-service.js'
export class AddNote extends React.Component {

    state = {
        title: null,
        txt: '',
        type: 'NoteText'
    }


    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    handleSubmit = () => {
        event.preventDefault
        var info = {}
        switch (this.state.type) {
            case "NoteText":
                info = { txt: this.state.txt }
                break;
            case "NoteImg":
                var strs = this.state.txt.split(" ");
                var url = strs.pop();
                if (strs.length > 0) var title = strs.join(' ');
                info = { url, title: (title) ? title : '' }
                break;
            case "NoteVideo":
                var strs = this.state.txt.split(" ");
                var url = strs.pop();
                if (strs.length > 0) var title = strs.join(' ');
                url = `https://www.youtube.com/embed/${url.split('watch?v=')[1]}`
                info = { url, title: (title) ? title : '' }
                break;

            default:
                break;
        }
        this.props.onAddNote(this.state.type, info);
        this.setState({ txt: '', title: '' })
    }

    addTodo = (todos) => {
        this.props.onAddNote('NoteTodos', { todos });
        this.returnToAddNote();
    }

    returnToAddNote = () => {
        this.setState({ type: "NoteText" })
    }

    getPlaceholder=()=>{
        if(this.state.type==='NoteText') return 'Enter a text'
        if(this.state.type==='NoteImg') return 'Enter a title and an image url'
        if(this.state.type==='NoteVideo') return 'Enter a title and an Youtube url' 
    }

   


    render() {
        return (
            <div className='add-note'>
                {(this.state.type === 'NoteTodos') && <AddNoteTodos returnToAddNote={this.returnToAddNote} addTodo={this.addTodo} />}
                {(this.state.type !== 'NoteTodos') &&
                    <div>

                        <form onSubmit={this.handleSubmit}>
                            <input className='add-note-input' value={this.state.txt} type="text" placeholder={this.getPlaceholder()}
                                onChange={this.handleChange} />
                        </form>
                        <div className="add-note-btn-container flex justify-between">
                            <button onClick={() => { this.setState({ type: "NoteImg" }) }}><i className="fas fa-image"></i></button>
                            <button onClick={() => { this.setState({ type: "NoteText" }) }}><i className="fas fa-comment"></i></button>
                            <button onClick={() => { this.setState({ type: "NoteVideo" }) }}><i className="fab fa-youtube"></i></button>
                            <button onClick={() => { this.setState({ type: "NoteTodos" }) }}><i className="fas fa-list"></i></button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

