import { NoteControlers } from './NoteControlers.jsx'
export function NoteTodos({ note, onDelete,onChangePinned }) {

    function isDone(doneAt) {
        if (doneAt) return ''
        else return 'done'
    }

    return (
        <div className='keep-note'>
            {note.isPinned && <h1>pinned</h1>}
            {note.info.label && <h1>{note.info.label}</h1>}
            <ul>
                {note.info.todos.map(todo => <li className={isDone(todo.doneAt)} key={todo.id}>{todo.txt}</li>)}
            </ul>
            <NoteControlers onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>
    )

}