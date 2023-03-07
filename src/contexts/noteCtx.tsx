import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
    useCallback,
    useEffect,
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

const NoteContext = createContext<NoteData>(noteData);

const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchParams] = useSearchParams();

    const noteService = new NoteService();
    const pageId = searchParams.get("page") as string;

    const getAllPageNotes = useCallback(() => {
        const allPageNotes = noteService.getAllPageNotes(pageId);
        setNotes(allPageNotes);
    }, [pageId]);

    useEffect(() => {
        getAllPageNotes();
    }, [getAllPageNotes]);

    const createPageNote = (note: Note) => {
        noteService.createNote(note);
        getAllPageNotes();
    };

    const deletePageNote = (pageId: string, noteId: string) => {
        noteService.deletePageNoteById(pageId, noteId);
        getAllPageNotes();
    };

    return (
        <NoteContext.Provider
            value={{ notes, pageId, createPageNote, deletePageNote }}
        >
            {children}
        </NoteContext.Provider>
    );
};

const useNoteContext = () => {
    return useContext(NoteContext);
};

export { NoteContext, NoteProvider, useNoteContext };
