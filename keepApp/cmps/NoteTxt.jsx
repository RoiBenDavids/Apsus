import { NoteControlers } from './NoteControlers.jsx'
export function NoteTxt({note,onDelete,onChangePinned,onChangeColor}) {

    return(
        <div style={{backgroundColor: `${note.color}`}}  className='keep-note' >
            {note.isPinned && <h1>pinned</h1>}
            <h1>{note.info.txt}</h1>
            <NoteControlers onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>

    )
}