import { NoteControlers } from './NoteControlers.jsx'
export function NoteTodos({onEdit, note, onDelete,onChangePinned,onChangeColor,OnDoneAt }) {

    function isDone(doneAt) {
    if (!doneAt) return ''
        else return 'done'
    }

    return (
        <div style={{backgroundColor: `${note.color}`}} className='keep-note'>
            {note.isPinned && <img className='pin' src="http://www.pngall.com/wp-content/uploads/4/Red-Pin-PNG.png" alt=""/>}
            <ul>
                {note.info.todos.map(todo => <li onClick={()=>{OnDoneAt(note.id,todo.id)}} className={`todo-note-list ${isDone(todo.doneAt)}`} key={todo.id}>{todo.txt}</li>)}
            </ul>
            <NoteControlers onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>
    )

}