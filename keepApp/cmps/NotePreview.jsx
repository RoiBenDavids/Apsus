import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NoteTodos.jsx'
export function NotePreview({note,onDelete,onChangePinned}) {

    switch (note.type) {
        case 'NoteText':
            return <NoteTxt onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteImg':
            return <NoteImg onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteVideo':
            return <NoteVideo onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteTodos':
            return <NoteTodos onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        default:
            return<NoteTxt onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
    }

}