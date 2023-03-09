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
import NotebookService from "../services/notebook";

interface NotebookData {
    notebooks: Notebook[];
    createNotebook: (notebook: Notebook) => void;
    deleteNotebook: (id: string) => void;
    selectNotebook: (id: string) => void;
    notebookId: string;
}

const notebookData: NotebookData = {
    notebooks: [],
    createNotebook(notebook: Notebook) {},
    deleteNotebook(id: string) {},
    selectNotebook(id: string) {},
    notebookId: "",
};

interface NotebookState {
    notebooks: Notebook[];
    notebookId: string;
}

type Action =
    | {
          type: "setNotebooks";
          payload: Notebook[];
      }
    | {
          type: "setNotebookId";
          payload: string;
      }
    | {
          type: "addNotebook";
          payload: Notebook;
      }
    | {
          type: "deleteNotebook";
          payload: string;
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
        default:
            return state;
    }
};

const NotebookContext = createContext<NotebookData>(notebookData);

const NotebookProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(notebookReducer, notebookState);
    const [searchParams, setSearchParams] = useSearchParams();
    const notebookService = new NotebookService();

    const notebookId = searchParams.get("notebookId") as string;

    const getAllNotebooks = useCallback(() => {
        const notebooks = notebookService.getAll();
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
        notebookService.create(notebook);
        dispatch({ type: "setNotebookId", payload: notebook.id });
        dispatch({ type: "addNotebook", payload: notebook });
        setSearchParams({ notebookId: notebook.id });
    };

    const deleteNotebook = (id: string) => {
        notebookService.delete(id);
        dispatch({ type: "deleteNotebook", payload: id });
    };

    const selectNotebook = (id: string) => {
        dispatch({ type: "setNotebookId", payload: id });
        setSearchParams({ notebookId: id });
    };

    return (
        <NotebookContext.Provider
            value={{
                ...state,
                createNotebook,
                deleteNotebook,
                selectNotebook,
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
