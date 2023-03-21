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
import DataService, { PREFIX } from "../services/DataService";
import { NoteService } from "../services/note";
import { Action, NoteData, NoteState } from "../types/noteCtx";

const defaultNote: Note = {
    id: "",
    note: "",
    createdAt: new Date(),
    pageId: "",
    updatedAt: new Date(),
};

const noteData: NoteData = {
    notes: [],
    noteId: "",
    pageId: "",
    selectedNote: defaultNote,
    createPageNote: (note: Note) => {},
    deletePageNote: (pageId: string, noteId: string) => {},
    selectNote: (note: Note) => {},
    unSelectNote: (noteId: string) => {},
    updateNote: (pageId: string, note: Note) => {},
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
        case "setSelectedNote":
            return {
                ...state,
                selectedNote: action.payload,
            };
        case "updateNote":
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                ),
            };
        default:
            return state;
    }
};

const noteState: NoteState = {
    notes: [],
    pageId: "",
    noteId: "",
    selectedNote: defaultNote,
};

const NoteContext = createContext<NoteData>(noteData);

const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, noteState);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(location.search);
    const dataService = new DataService<Note>("notes");
    
    const pageId = searchParams.get("page") as string;
    const noteId = searchParams.get("noteId") as string;

    const getAllPageNotes = useCallback(() => {
        const allPageNotes =
            (dataService.getAll(`${PREFIX.p}${pageId}`) as Note[]) || [];
        dispatch({ type: "setPageId", payload: pageId });

        if (noteId) {
            dispatch({ type: "setNoteId", payload: noteId });
            const foundNote = allPageNotes.find((note) => note.id === noteId);

            if (foundNote)
                dispatch({ type: "setSelectedNote", payload: foundNote });
        }

        dispatch({ type: "setNote", payload: allPageNotes });
    }, [pageId, noteId]);

    useEffect(() => {
        getAllPageNotes();
    }, [getAllPageNotes]);

    const createPageNote = (note: Note) => {
        dataService.create(note);
        dispatch({ type: "createNote", payload: note });
    };

    const deletePageNote = (pageId: string, noteId: string) => {
        dataService.delete(pageId, noteId);
        dispatch({ type: "deleteNote", payload: noteId });
    };

    const selectNote = (note: Note) => {
        dispatch({ type: "setNoteId", payload: note.id });
        dispatch({ type: "setSelectedNote", payload: note });
        urlSearchParams.set("noteId", note.id);
        navigate({ search: `?${urlSearchParams.toString()}` });
    };

    const unSelectNote = (noteId: string) => {
        dispatch({ type: "setNoteId", payload: "" });
        dispatch({ type: "setSelectedNote", payload: defaultNote });
        urlSearchParams.delete("noteId");
        navigate({ search: `?${urlSearchParams.toString()}` });
    };

    const updateNote = (pageId: string, note: Note) => {
        dataService.update(pageId, note);
        dispatch({ type: "updateNote", payload: note });
        unSelectNote(note.id);
    };

    return (
        <NoteContext.Provider
            value={{
                ...state,
                createPageNote,
                deletePageNote,
                selectNote,
                unSelectNote,
                updateNote,
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
