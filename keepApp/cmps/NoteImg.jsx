import { NoteControlers } from './NoteControlers.jsx'
export function NoteImg({ note,onDelete ,onChangePinned,onChangeColor,onEdit}) {
    return (
        <div style={{backgroundColor: `${note.color}`}} className='keep-note'>
            {note.isPinned && <h1>pinned</h1>}
            {note.info.title && <h1 suppressContentEditableWarning={true} contentEditable={true}>{note.info.title}</h1>}
            <img  className="note-img" src={note.info.url} alt="img" />
            <NoteControlers onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>
    )

}