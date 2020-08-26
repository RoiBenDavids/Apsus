import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NoteTodos.jsx'
export function NotePreview({note,onDelete,onChangePinned,onChangeColor}) {

    switch (note.type) {
        case 'NoteText':
            return <NoteTxt onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteImg':
            return <NoteImg onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteVideo':
            return <NoteVideo onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteTodos':
            return <NoteTodos onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        default:
            return<NoteTxt onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
    }

}