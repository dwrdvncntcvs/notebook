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
}

const noteData: NoteData = {
    notes: [],
    pageId: ""
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

    return (
        <NoteContext.Provider value={{ notes, pageId }}>
            {children}
        </NoteContext.Provider>
    );
};

const useNoteContext = () => {
    return useContext(NoteContext);
};

export { NoteContext, NoteProvider, useNoteContext };
