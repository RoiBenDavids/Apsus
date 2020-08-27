import { NoteControlers } from './NoteControlers.jsx'
export function NoteTodos({onEdit, note, onDelete,onChangePinned,onChangeColor,OnDoneAt }) {

    function isDone(doneAt) {
    if (!doneAt) return ''
        else return 'done'
    }

    return (
        <div style={{backgroundColor: `${note.color}`}} className='keep-note'>
            {note.isPinned && <h1>pinned</h1>}
            <ul>
                {note.info.todos.map(todo => <li onClick={()=>{OnDoneAt(note.id,todo.id)}} className={`todo-note-list ${isDone(todo.doneAt)}`} key={todo.id}>{todo.txt}</li>)}
            </ul>
            <NoteControlers onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>
    )

}