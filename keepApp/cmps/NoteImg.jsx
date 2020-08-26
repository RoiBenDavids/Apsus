import { NoteControlers } from './NoteControlers.jsx'
export function NoteImg({ note,onDelete ,onChangePinned}) {
    return (
        <div className='keep-note'>
            {note.isPinned && <h1>pinned</h1>}
            {note.info.title && <h1>{note.info.title}</h1>}
            <img className="note-img" src={note.info.url} alt="img" />
            <NoteControlers onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>
    )

}