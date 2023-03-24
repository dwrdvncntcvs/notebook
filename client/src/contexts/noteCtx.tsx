import { useMutation, useQuery } from "@apollo/client";
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
import {
    CREATE_NOTE,
    DELETE_NOTE,
    GET_NOTES,
    UPDATE_NOTE,
} from "../graphql/notes";
import { IGetNote, PageMeta } from "../graphql/type";
import Note from "../models/Note";
import DataService, { PREFIX } from "../services/DataService";
import { NoteService } from "../services/note";
import { Action, NoteData, NoteState } from "../types/noteCtx";
import { usePageContext } from "./pageCtx";

const defaultNoteMeta: PageMeta = {
    count: 0,
    page: 1,
    totalPages: 0,
};

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
    deletePageNote: (noteId: string) => {},
    selectNote: (note: Note) => {},
    unSelectNote: (noteId: string) => {},
    updateNote: (note: Note) => {},
    noteMeta: defaultNoteMeta,
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
    noteMeta: defaultNoteMeta,
};

const NoteContext = createContext<NoteData>(noteData);

const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, noteState);
    const location = useLocation();
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(location.search);

    const { pageId } = usePageContext();

    const { data, refetch } = useQuery(GET_NOTES, {
        skip: !pageId,
        variables: {
            pageId,
            page: 1,
            limit: 10,
        },
    });

    const [createN] = useMutation(CREATE_NOTE);
    const [updateN] = useMutation(UPDATE_NOTE);
    const [deleteN] = useMutation(DELETE_NOTE);

    const getAllPageNotes = useCallback(() => {
        if (pageId) refetch();
        if (!data || !pageId) {
            dispatch({ type: "setNote", payload: [] });
            dispatch({ type: "setPagination", payload: defaultNoteMeta });
            return;
        }

        const notes = data?.notes as IGetNote;

        dispatch({ type: "setNote", payload: notes.notes });
        dispatch({ type: "setPagination", payload: notes.noteMeta });
    }, [data, pageId]);

    useEffect(() => {
        getAllPageNotes();
    }, [getAllPageNotes]);

    const createPageNote = async (n: Note) => {
        try {
            const response = await createN({
                variables: { pageId, data: { note: n.note } },
            });

            const createdNote = response.data?.createNote as Note;

            dispatch({ type: "createNote", payload: createdNote });
        } catch (err) {
            console.log(err);
        }
    };

    const deletePageNote = async (noteId: string) => {
        try {
            await deleteN({ variables: { id: noteId } });
            dispatch({ type: "deleteNote", payload: noteId });
        } catch (err) {
            console.log(err);
        }
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

    const updateNote = async (n: Note) => {
        try {
            await updateN({
                variables: { noteId: n.id, data: { note: n.note } },
            });

            dispatch({ type: "updateNote", payload: n });
            unSelectNote(n.id);
        } catch (err) {
            console.log(err);
        }
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
