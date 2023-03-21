import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useCallback,
    useReducer,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Notebook } from "../models/Notebook";
import DataService from "../services/DataService";
import NotebookService from "../services/notebook";
import { Action, NotebookData, NotebookState } from "../types/notebookCtx";

const notebookData: NotebookData = {
    notebooks: [],
    createNotebook(notebook: Notebook) {},
    deleteNotebook(id: string) {},
    selectNotebook(id: string) {},
    updateNotebook(id: string, name: string) {},
    notebookId: "",
};

const notebookState: NotebookState = {
    notebooks: [],
    notebookId: "",
};

const notebookReducer = (state: NotebookState, action: Action) => {
    switch (action.type) {
        case "setNotebooks":
            return { ...state, notebooks: action.payload };
        case "setNotebookId":
            return { ...state, notebookId: action.payload };
        case "addNotebook":
            return {
                ...state,
                notebooks: [...state.notebooks, action.payload],
            };
        case "deleteNotebook":
            return {
                ...state,
                notebooks: state.notebooks.filter(
                    ({ id }) => id !== action.payload
                ),
            };
        case "updateNotebook": {
            return {
                ...state,
                notebooks: state.notebooks.map((notebook) =>
                    notebook.id === action.payload.id
                        ? { ...notebook, name: action.payload.name }
                        : notebook
                ),
            };
        }
        default:
            return state;
    }
};

const NotebookContext = createContext<NotebookData>(notebookData);

const NotebookProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(notebookReducer, notebookState);
    const [searchParams, setSearchParams] = useSearchParams();
    const dataService = new DataService<Notebook>("notebooks");

    const notebookId = searchParams.get("notebookId") as string;

    const getAllNotebooks = useCallback(() => {
        const notebooks = dataService.getAll();
        dispatch({ type: "setNotebooks", payload: notebooks });
    }, []);

    useEffect(() => {
        getAllNotebooks();
    }, [getAllNotebooks]);

    useEffect(() => {
        if (notebookId === "undefined" || !notebookId) {
            const firstNotebookId = state.notebooks[0]?.id;
            dispatch({ type: "setNotebookId", payload: firstNotebookId });
            setSearchParams({ notebookId: firstNotebookId });
        } else dispatch({ type: "setNotebookId", payload: notebookId });
    }, [notebookId]);

    const createNotebook = (notebook: Notebook) => {
        dataService.create(notebook);
        dispatch({ type: "setNotebookId", payload: notebook.id });
        dispatch({ type: "addNotebook", payload: notebook });
        setSearchParams({ notebookId: notebook.id });
    };

    const deleteNotebook = (id: string) => {
        dataService.delete(id);
        dispatch({ type: "deleteNotebook", payload: id });
    };

    const selectNotebook = (id: string) => {
        dispatch({ type: "setNotebookId", payload: id });
        setSearchParams({ notebookId: id });
    };

    const updateNotebook = (id: string, name: string) => {
        dataService.update(id, name);
        dispatch({ type: "updateNotebook", payload: { id, name } });
    };

    return (
        <NotebookContext.Provider
            value={{
                ...state,
                createNotebook,
                deleteNotebook,
                selectNotebook,
                updateNotebook,
            }}
        >
            {children}
        </NotebookContext.Provider>
    );
};

const useNotebookContext = () => {
    return useContext(NotebookContext);
};

export { NotebookContext, NotebookProvider, useNotebookContext };
