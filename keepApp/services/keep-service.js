export const keepService = {
    query,
    create,
    remove,
    changePinned,
    ChangeColor,
    getById,
    edit,
    doneAt
}

const KEY_STORAGE = 'notesService'
var beforeStorage2 = [{ "color": "#ffc1fa", "id": "l1T0J", "type": "NoteImg", "isPinned": true, "info": { "title": "do you?", "url": "https://media.giphy.com/media/L3bj6t3opdeNddYCyl/giphy.gif" } }, { "color": "#8675a9", "id": "vH72Q", "type": "NoteText", "isPinned": false, "info": { "txt": " סגולי כזה" } }, { "color": "#12cad6", "id": "K90bM", "type": "NoteImg", "isPinned": false, "info": { "title": "every post in the slack", "url": "https://emoji.slack-edge.com/T0146T47BKR/conga_party_parrot/86dcd8ecb1890951.gif" } }, { "color": "#ffc1fa", "id": "a4zwT", "type": "NoteTodos", "isPinned": false, "info": { "todos": [{ "id": "CoD6R", "txt": "search how to code react in google", "doneAt": 1598551525065 }, { "id": "pkXr8", "txt": "learn react from google", "doneAt": 1598551529208 }, { "id": "BDyfB", "txt": "build my app", "doneAt": 1598551526076 }, { "id": "F27YZ", "txt": "search how style by css in google", "doneAt": 1598551532550 }, { "id": "X8xlB", "txt": "style my app", "doneAt": 1598551534985 }, { "id": "ymZAK", "txt": "delivery sprint 3", "doneAt": null }] } }, { "color": "#ede682", "id": "65rtH", "type": "NoteVideo", "isPinned": false, "info": { "title": "where you get your skill?", "url": "https://www.youtube.com/embed/1IkcJcu4ksE" } }]



var notes = loadFromStorage(KEY_STORAGE)
if (!notes) {
    notes = beforeStorage2;
    saveToStorage(KEY_STORAGE, notes);
}

function query() {
    return Promise.resolve(notes)
        .then((notes) => {
            var sorted = notes.sort((noteA, noteB) => {
                if (noteA.isPinned && noteB.isPinned) return 0
                if (noteA.isPinned && !noteB.isPinned) return -1
                if (!noteA.isPinned && noteB.isPinned) return 1
                return 0
            })
            return sorted
        })
}


function create(type, info) {
    var newNote = {
        color: getColor(),
        id: makeId(),
        type,
        isPinned: false,
        info
    }
    _add(newNote);
}

function remove(noteId) {
    notes = notes.filter(note => note.id !== noteId)
    saveToStorage(KEY_STORAGE, notes);
}

function _add(note) {
    notes.unshift(note);
    saveToStorage(KEY_STORAGE, notes);
}

function changePinned(noteId) {
    var idx = notes.findIndex(note => note.id === noteId);
    notes[idx].isPinned = !notes[idx].isPinned
    notes = [...notes];
    saveToStorage(KEY_STORAGE, notes);
}

function ChangeColor(noteId, color) {
    var idx = notes.findIndex(note => note.id === noteId);
    notes[idx].color = color
    notes = [...notes];
    saveToStorage(KEY_STORAGE, notes);
}

function getById(id) {
    return notes.find((note) => note.id === id)
}

function edit(noteId, info) {
    let editedNotes = [...notes];
    const idx = editedNotes.findIndex(note => note.id === noteId)
    editedNotes[idx].info = { ...info }
    notes = editedNotes
    saveToStorage(KEY_STORAGE, notes);
}

function doneAt(noteId, todoId) {
    let editedNotes = [...notes];
    const noteIdx = editedNotes.findIndex(note => note.id === noteId)
    const todoIdx = editedNotes[noteIdx].info.todos.findIndex(todo => todo.id === todoId)
    const doneAt = editedNotes[noteIdx].info.todos[todoIdx].doneAt
    editedNotes[noteIdx].info.todos[todoIdx].doneAt = (doneAt) ? null : Date.now();
    notes = editedNotes
    saveToStorage(KEY_STORAGE, notes);
}