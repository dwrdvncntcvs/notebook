import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
    useCallback,
    useEffect,
    useReducer,
} from "react";
import { useSearchParams } from "react-router-dom";
import Note from "../models/Note";
import { NoteService } from "../services/note";

interface NoteData {
    notes: Note[];
    pageId: string;
    createPageNote: (note: Note) => void;
    deletePageNote: (pageId: string, noteId: string) => void;
}

const noteData: NoteData = {
    notes: [],
    pageId: "",
    createPageNote: (note: Note) => {},
    deletePageNote: (pageId: string, noteId: string) => {},
};

interface NoteState {
    notes: Note[];
    pageId: string;
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
      };

const noteReducer = (state: NoteState, action: Action) => {
    switch (action.type) {
        case "setNote":
            return { ...state, notes: action.payload };
        case "setPageId":
            return { ...state, pageId: action.payload };
        case "createNote":
            return { ...state, notes: [...state.notes, action.payload] };
        case "deleteNote":
            return {
                ...state,
                notes: state.notes.filter(({ id }) => id !== action.payload),
            };
        default:
            return state;
    }
};

const noteState: NoteState = {
    notes: [],
    pageId: "",
};

const NoteContext = createContext<NoteData>(noteData);

const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, noteState);
    const [searchParams] = useSearchParams();

    const noteService = new NoteService();
    const pageId = searchParams.get("page") as string;

    const getAllPageNotes = useCallback(() => {
        const allPageNotes = noteService.getAllPageNotes(pageId);
        dispatch({ type: "setPageId", payload: pageId });
        dispatch({ type: "setNote", payload: allPageNotes });
    }, [pageId]);

    useEffect(() => {
        getAllPageNotes();
    }, [getAllPageNotes]);

    const createPageNote = (note: Note) => {
        noteService.createNote(note);
        dispatch({ type: "createNote", payload: note });
    };

    const deletePageNote = (pageId: string, noteId: string) => {
        noteService.deletePageNoteById(pageId, noteId);
        dispatch({ type: "deleteNote", payload: noteId });
    };

    return (
        <NoteContext.Provider
            value={{ ...state, createPageNote, deletePageNote }}
        >
            {children}
        </NoteContext.Provider>
    );
};

const useNoteContext = () => {
    return useContext(NoteContext);
};

export { NoteContext, NoteProvider, useNoteContext };
