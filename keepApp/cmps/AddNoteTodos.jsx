import { TodoPreview } from './TodoPreview.jsx'
import eventBus from '../../services/event-bus-service.js'
export class AddNoteTodos extends React.Component {

    state = {
        todos: [],
        newTodo: ''
    }


    handleChange = ({ target }) => {
        this.setState({ newTodo: target.value })
    }

    handleSubmit = () => {
        event.preventDefault();
        let todos = [...this.state.todos];
        todos.push({ id: makeId(), txt: this.state.newTodo, doneAt: null });
        this.setState({ todos, newTodo: '' });
    }

    removeTodo = (todoId) => {
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== todoId) })
    }

    onSaveTodo = () => {
        this.props.addTodo(this.state.todos)
        this.setState({ todos: [], newTodo: '' })
    }



    render() {
        return (
            <div>

                <div className='add-note-todos'>
                    <form className="flex" onSubmit={this.handleSubmit}>
                        <input className='add-note-input' value={this.state.newTodo} type="text" placeholder="Add todo"
                            onChange={this.handleChange} />
                        <div className='flex justify-around'>
                            <button onClick={() => this.handleSubmit}><i className="fas fa-plus"></i></button>
                            <button onClick={() => this.onSaveTodo()}><i className="far fa-save"></i></button>
                            <button onClick={() => this.props.returnToAddNote()}><i className="fas fa-undo"></i></button>
                        </div>
                    </form>
                <div className='todo-list'>
                    {this.state.todos.map((todo, idx) => <TodoPreview removeTodo={this.removeTodo} key={todo.id} todo={todo} />)}
                </div>



                </div>
            </div>
        )
    }
}

