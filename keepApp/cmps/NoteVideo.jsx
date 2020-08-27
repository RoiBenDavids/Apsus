import { NoteControlers } from './NoteControlers.jsx'
export function NoteVideo({onEdit, note,onDelete,onChangePinned,onChangeColor}) {

    return(
        <div style={{backgroundColor: `${note.color}`}} className='keep-note'>
            {note.isPinned && <h1>pinned</h1>}
            
            {note.info.title && <h1 suppressContentEditableWarning={true} contentEditable={true}>{note.info.title}</h1>}
            <iframe width="400" height="315" src={note.info.url}></iframe>
            <NoteControlers onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} noteId={note.id} />
        </div>
    )
}