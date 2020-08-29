import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NoteTodos.jsx'
export function NotePreview({ note, onDelete, onChangePinned, onChangeColor, onEdit, OnDoneAt, removeTodo, addTodo, onShare }) {

    switch (note.type) {
        case 'NoteText':
            return <NoteTxt onEdit={onEdit}
                onChangeColor={onChangeColor}
                onChangePinned={onChangePinned}
                onDelete={onDelete}
                note={note}
                onShare={onShare} />
        case 'NoteImg':
            return <NoteImg onEdit={onEdit}
                onChangeColor={onChangeColor}
                onChangePinned={onChangePinned}
                onDelete={onDelete}
                note={note}
                onShare={onShare} />
        case 'NoteVideo':
            return <NoteVideo onEdit={onEdit}
                onChangeColor={onChangeColor}
                onChangePinned={onChangePinned}
                onDelete={onDelete}
                note={note}
                onShare={onShare} />
        case 'NoteTodos':
            return <NoteTodos OnDoneAt={OnDoneAt}
                onEdit={onEdit}
                onChangeColor={onChangeColor}
                onChangePinned={onChangePinned}
                onDelete={onDelete}
                note={note}
                addTodo={addTodo}
                removeTodo={removeTodo}
                onShare={onShare} />
        default:
            return <NoteTxt onEdit={onEdit}
                onChangeColor={onChangeColor}
                onChangePinned={onChangePinned}
                onDelete={onDelete}
                note={note}
                onShare={onShare} />
    }

}