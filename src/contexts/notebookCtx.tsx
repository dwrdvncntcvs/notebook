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
}

const notebookData: NotebookData = {
    notebooks: [],
};

const NotebookContext = createContext<NotebookData>(notebookData);

const NotebookProvider: FC<PropsWithChildren> = ({ children }) => {
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const notebookService = new NotebookService();

    const getAllNotebooks = useCallback(() => {
        return notebookService.getAll();
    }, []);

    useEffect(() => {
        const notebooks = getAllNotebooks();
        setNotebooks(notebooks);
    }, [getAllNotebooks]);

    return (
        <NotebookContext.Provider value={{ notebooks }}>
            {children}
        </NotebookContext.Provider>
    );
};

const useNotebookContext = () => {
    return useContext(NotebookContext);
};

export { NotebookContext, NotebookProvider, useNotebookContext };
