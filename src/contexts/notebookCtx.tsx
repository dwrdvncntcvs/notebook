import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { Notebook } from "../models/Notebook";
import NotebookService from "../services/notebook";

interface NotebookData {
    notebooks: Notebook[];
    createNotebook: (notebook: Notebook) => void;
}

const notebookData: NotebookData = {
    notebooks: [],
    createNotebook(notebook: Notebook) {},
};

const NotebookContext = createContext<NotebookData>(notebookData);

const NotebookProvider: FC<PropsWithChildren> = ({ children }) => {
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const notebookService = new NotebookService();

    const getAllNotebooks = useCallback(() => {
        const notebooks = notebookService.getAll();
        setNotebooks(notebooks);
    }, []);

    useEffect(() => {
        getAllNotebooks();
    }, [getAllNotebooks]);

    const createNotebook = (notebook: Notebook) => {
        notebookService.create(notebook);
        getAllNotebooks();
    };

    return (
        <NotebookContext.Provider value={{ notebooks, createNotebook }}>
            {children}
        </NotebookContext.Provider>
    );
};

const useNotebookContext = () => {
    return useContext(NotebookContext);
};

export { NotebookContext, NotebookProvider, useNotebookContext };
