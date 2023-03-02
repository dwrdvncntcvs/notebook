import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
    useEffect,
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

    useEffect(() => {
        const notebookService = new NotebookService();
        const notebooks = notebookService.getAll();
        setNotebooks(notebooks);
    }, []);

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
