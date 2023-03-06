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
    notebookId: string;
}

const notebookData: NotebookData = {
    notebooks: [],
    createNotebook(notebook: Notebook) {},
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

    return (
        <NotebookContext.Provider
            value={{ notebooks, createNotebook, notebookId }}
        >
            {children}
        </NotebookContext.Provider>
    );
};

const useNotebookContext = () => {
    return useContext(NotebookContext);
};

export { NotebookContext, NotebookProvider, useNotebookContext };
