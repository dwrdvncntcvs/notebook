import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useCallback,
    useEffect,
    useReducer,
} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Note from "../models/Note";
import { NoteService } from "../services/note";

interface NoteData {
    notes: Note[];
    noteId: string;
    pageId: string;
    createPageNote: (note: Note) => void;
    deletePageNote: (pageId: string, noteId: string) => void;
    selectNote: (noteId: string) => void;
    unSelectNote: (noteId: string) => void;
}

const noteData: NoteData = {
    notes: [],
    noteId: "",
    pageId: "",
    createPageNote: (note: Note) => {},
    deletePageNote: (pageId: string, noteId: string) => {},
    selectNote: (noteId: string) => {},
    unSelectNote: (noteId: string) => {},
};

interface NoteState {
    notes: Note[];
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
      };

const noteReducer = (state: NoteState, action: Action) => {
    switch (action.type) {
        case "setNote":
            return { ...state, notes: action.payload };
        case "setPageId":
            return { ...state, pageId: action.payload };
        case "setNoteId":
            return { ...state, noteId: action.payload };
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
    noteId: "",
};

const NoteContext = createContext<NoteData>(noteData);

const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, noteState);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(location.search);

    const noteService = new NoteService();
    const pageId = searchParams.get("page") as string;
    const noteId = searchParams.get("noteId") as string;

    const getAllPageNotes = useCallback(() => {
        const allPageNotes = noteService.getAllPageNotes(pageId);
        dispatch({ type: "setPageId", payload: pageId });
        dispatch({ type: "setNoteId", payload: noteId });
        dispatch({ type: "setNote", payload: allPageNotes });
    }, [pageId, noteId]);

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

    const selectNote = (noteId: string) => {
        dispatch({ type: "setNoteId", payload: noteId });
        urlSearchParams.set("noteId", noteId);
        navigate({ search: `?${urlSearchParams.toString()}` });
    };

    const unSelectNote = (noteId: string) => {
        dispatch({ type: "setNoteId", payload: "" });
        urlSearchParams.delete("noteId");
        navigate({ search: `?${urlSearchParams.toString()}` });
    };

    return (
        <NoteContext.Provider
            value={{
                ...state,
                createPageNote,
                deletePageNote,
                selectNote,
                unSelectNote,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};

const useNoteContext = () => {
    return useContext(NoteContext);
};

export { NoteContext, NoteProvider, useNoteContext };
