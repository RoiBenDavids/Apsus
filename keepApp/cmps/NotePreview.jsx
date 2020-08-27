import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NoteTodos.jsx'
export function NotePreview({note,onDelete,onChangePinned,onChangeColor,onEdit,OnDoneAt}) {

    switch (note.type) {
        case 'NoteText':
            return <NoteTxt onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteImg':
            return <NoteImg onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteVideo':
            return <NoteVideo onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        case 'NoteTodos':
            return <NoteTodos OnDoneAt={OnDoneAt} onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
        default:
            return<NoteTxt onEdit={onEdit} onChangeColor={onChangeColor} onChangePinned={onChangePinned} onDelete={onDelete} note={note}/>
    }

}