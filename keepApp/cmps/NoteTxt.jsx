import { NoteControlers } from './NoteControlers.jsx'
export function NoteTxt({note,onDelete,onChangePinned}) {

    return(
        <div className='keep-note'>
            {note.isPinned && <h1>pinned</h1>}
            <h1>{note.info.txt}</h1>
            <NoteControlers onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>

    )
}