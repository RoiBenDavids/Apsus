import { NoteControlers } from './NoteControlers.jsx'
export function NoteVideo({note,onDelete,onChangePinned}) {

    return(
        <div className='keep-note'>
            {note.isPinned && <h1>pinned</h1>}
            
            {note.info.title && <h1>{note.info.title}</h1>}
            <iframe width="400" height="315" src={note.info.url}></iframe>
            <NoteControlers onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>
    )
}