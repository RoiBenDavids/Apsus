import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NoteTodos.jsx'
export function NotePreview({note}) {

    switch (note.type) {
        case 'NoteText':
            return <NoteTxt note={note}/>
        case 'NoteImg':
            return <NoteImg note={note}/>
        case 'NoteVideo':
            return <NoteVideo note={note}/>
        case 'NoteTodos':
            return <NoteTodos note={note}/>
        default:
            return<NoteTxt note={note}/>

    }

}