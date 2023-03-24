import { PageMeta } from "../graphql/type";
import Note from "../models/Note";

interface NoteData {
    notes: Note[];
    noteId: string;
    pageId: string;
    selectedNote: Note;
    createPageNote: (note: Note) => void;
    deletePageNote: (noteId: string) => void;
    selectNote: (note: Note) => void;
    unSelectNote: (noteId: string) => void;
    updateNote: (note: Note) => void;
    noteMeta: PageMeta;
}
interface NoteState {
    notes: Note[];
    selectedNote: Note;
    pageId: string;
    noteId: string;
    noteMeta: PageMeta;
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
      }
    | {
          type: "setPagination";
          payload: PageMeta;
      };

export { NoteData, NoteState, Action };
