import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Notebook } from "../models/Notebook";
import NotebookService from "../services/notebook";

interface NotebookData {
    notebooks: Notebook[];
    createNotebook: (notebook: Notebook) => void;
    deleteNotebook: (id: string) => void;
    notebookId: string;
}

const notebookData: NotebookData = {
    notebooks: [],
    createNotebook(notebook: Notebook) {},
    deleteNotebook(id: string) {},
    notebookId: "",
};

const NotebookContext = createContext<NotebookData>(notebookData);

const NotebookProvider: FC<PropsWithChildren> = ({ children }) => {
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const notebookService = new NotebookService();

    const notebookId = searchParams.get("notebookId") as string;

    const getAllNotebooks = useCallback(() => {
        const notebooks = notebookService.getAll();
        setNotebooks(notebooks);
    }, []);

    useEffect(() => {
        getAllNotebooks();
    }, [getAllNotebooks]);

    useEffect(() => {
        if (notebookId === "undefined" || !notebookId) {
            const firstNotebookId = notebooks[0]?.id;

            setSearchParams({ notebookId: firstNotebookId });
        }
    }, [notebookId]);

    const createNotebook = (notebook: Notebook) => {
        notebookService.create(notebook);
        getAllNotebooks();
    };

    const deleteNotebook = (id: string) => {
        notebookService.delete(id);
        getAllNotebooks();
    };

    return (
        <NotebookContext.Provider
            value={{ notebooks, createNotebook, notebookId, deleteNotebook }}
        >
            {children}
        </NotebookContext.Provider>
    );
};

const useNotebookContext = () => {
    return useContext(NotebookContext);
};

export { NotebookContext, NotebookProvider, useNotebookContext };
