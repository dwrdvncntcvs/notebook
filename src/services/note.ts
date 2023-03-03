import Note from "../models/Note";

interface NoteDictionary {
    [key: string]: Note[];
}

interface NoteInterface {
    getAllPageNotes: (pageId: string) => Note[];
}

export class NoteService implements NoteInterface {
    n = "notes";

    getAllPageNotes = (pageId: string): Note[] => {
        const notes = JSON.parse(
            localStorage.getItem(this.n)!
        ) as NoteDictionary;

        const pageNotes = notes[pageId];

        return pageNotes;
    };

    createNote = (note: Note) => {
        const notes = JSON.parse(
            localStorage.getItem(this.n)!
        ) as NoteDictionary;

        if (!notes[note.pageId]) {
            notes[note.pageId] = [];
        }

        notes[note.pageId].push(note);

        localStorage.setItem("notes", JSON.stringify(notes));
    };
}
