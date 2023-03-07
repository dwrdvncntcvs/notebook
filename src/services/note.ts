import Note from "../models/Note";

interface NoteDictionary {
    [key: string]: Note[];
}

interface NoteInterface {
    getAllPageNotes: (pageId: string) => Note[];
    getAllNotes: () => NoteDictionary;
    createNote: (note: Note) => void;
    deleteNoteByPageId: (pageId: string) => void;
}

export class NoteService implements NoteInterface {
    private n = "notes";

    getAllNotes() {
        return JSON.parse(localStorage.getItem(this.n)!) as NoteDictionary;
    }

    getAllPageNotes(pageId: string): Note[] {
        const notes = this.getAllNotes();

        const pageNotes = notes[pageId];

        return pageNotes;
    }

    createNote(note: Note) {
        const notes = this.getAllNotes();

        if (!notes[note.pageId]) {
            notes[note.pageId] = [];
        }

        notes[note.pageId].push(note);

        localStorage.setItem("notes", JSON.stringify(notes));
    }

    deleteNoteByPageId(pageId: string) {
        const notes = this.getAllNotes();

        delete notes[pageId];

        localStorage.setItem("notes", JSON.stringify(notes));
    }
}
