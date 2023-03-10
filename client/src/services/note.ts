import Note from "../models/Note";
import { NoteDictionary, NoteInterface } from "../types/services";

export class NoteService implements NoteInterface {
    private n = "notes";

    getAllNotes() {
        return JSON.parse(localStorage.getItem(this.n)!) as NoteDictionary;
    }

    getAllPageNotes(pageId: string): Note[] {
        const notes = this.getAllNotes();

        const pageNotes = notes[pageId];

        return pageNotes || [];
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

    deletePageNoteById(pageId: string, noteId: string) {
        const allNotes = this.getAllNotes();
        const allPagesNotes = this.getAllPageNotes(pageId);

        const updatedNotes = allPagesNotes.filter(({ id }) => id !== noteId);

        if (updatedNotes.length < 1) {
            delete allNotes[pageId];
            localStorage.setItem("notes", JSON.stringify(allNotes));
            return;
        }

        allNotes[pageId] = updatedNotes;
        localStorage.setItem("notes", JSON.stringify(allNotes));
    }

    updatePageNoteById(pageId: string, note: Note) {
        const allNotes = this.getAllNotes();
        const allPagesNotes = this.getAllPageNotes(pageId);

        const updateNotes = allPagesNotes.map((pageNote) =>
            pageNote.id === note.id ? note : pageNote
        );

        allNotes[pageId] = updateNotes;
        localStorage.setItem("notes", JSON.stringify(allNotes));
    }
}
