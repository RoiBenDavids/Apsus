export const keepService = {
    query,
    create,
    remove,
    changePinned,
    ChangeColor
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
        }
    }
];

var notes = loadFromStorage(KEY_STORAGE)
if (!notes) {
    notes = beforeStorage;
    saveToStorage(KEY_STORAGE, notes);
}

function query() {
    return Promise.resolve(notes);
}


function create(type, info) {
    newNote = {
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
}

function _add(note) {
    notes.push(note);
}

function changePinned(noteId) {
    var idx = notes.findIndex(note => note.id === noteId);
    notes[idx].isPinned = !notes[idx].isPinned
    notes = [...notes];
}

function ChangeColor(noteId,color){
    var idx = notes.findIndex(note => note.id === noteId);
    notes[idx].color = color
    notes = [...notes];
}