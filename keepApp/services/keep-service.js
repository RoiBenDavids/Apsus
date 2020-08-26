export const keepService = {
    query,
    create,
    remove
}

const KEY_STORAGE = 'notesService'
var beforeStorage = [
    {
        id:makeId(),
        type: "NoteText",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id:makeId(),
        type: "NoteImg",
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id:makeId(),
        type: "NoteTodos",
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
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