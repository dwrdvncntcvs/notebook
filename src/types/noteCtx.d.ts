import Note from "../models/Note";

interface NoteData {
    notes: Note[];
    noteId: string;
    pageId: string;
    selectedNote: Note;
    createPageNote: (note: Note) => void;
    deletePageNote: (pageId: string, noteId: string) => void;
    selectNote: (note: Note) => void;
    unSelectNote: (noteId: string) => void;
    updateNote: (pageId: string, note: Note) => void;
}
interface NoteState {
    notes: Note[];
    selectedNote: Note;
    pageId: string;
    noteId: string;
}
type Action =
    | {
          type: "setNote";
          payload: Note[];
      }
    | {
          type: "setPageId";
          payload: string;
      }
    | {
          type: "createNote";
          payload: Note;
      }
    | {
          type: "deleteNote";
          payload: string;
      }
    | {
          type: "setNoteId";
          payload: string;
      }
    | {
          type: "setSelectedNote";
          payload: Note;
      }
    | {
          type: "updateNote";
          payload: Note;
      };

export { NoteData, NoteState, Action };
