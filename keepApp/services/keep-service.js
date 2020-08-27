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

var beforeStorage = [
    {
        color: getColor(),
        id: makeId(),
        type: "NoteText",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        color: getColor(),
        id: makeId(),
        type: "NoteImg",
        info: {
            url: "https://media.giphy.com/media/xT9IgMw9fhuEGUaJqg/giphy.gif",
            title: "SAVAGE"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        color: getColor(),
        id: makeId(),
        type: "NoteTodos",
        info: {
            label: "How was it:",
            todos: [
                { id: makeId(), txt: "Do that", doneAt: null },
                { id: makeId(), txt: "Do this", doneAt: 187111111 }
            ]
        }
    },
    {
        color: getColor(),
        id: makeId(),
        type: "NoteVideo",
        info: {
            url: "https://www.youtube.com/embed/d60H5D9GefE",
            title: "omer adam"
            //https://www.youtube.com/watch?v=d60H5D9GefE
        }
    }
];

var notes = loadFromStorage(KEY_STORAGE)
if (!notes) {
    notes = beforeStorage;
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