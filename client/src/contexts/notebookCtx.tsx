import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Notebook } from "../models/Notebook";
import DataService from "../services/DataService";
import { Action, NotebookData, NotebookState } from "../types/notebookCtx";
import { useQuery } from "@apollo/client";
import { GET_NOTEBOOKS } from "../graphql/notebooks";
import { IGetNotebook, PageMeta } from "../graphql/type";

const defaultNotebookMeta: PageMeta = {
    count: 0,
    page: 1,
    totalPages: 0,
};

const notebookData: NotebookData = {
    notebooks: [],
    createNotebook(notebook: Notebook) {},
    deleteNotebook(id: string) {},
    selectNotebook(id: string) {},
    updateNotebook(id: string, name: string) {},
    notebookId: "",
    notebookMeta: defaultNotebookMeta,
};

const notebookState: NotebookState = {
    notebooks: [],
    notebookId: "",
    notebookMeta: defaultNotebookMeta,
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
        case "updateNotebook":
            return {
                ...state,
                notebooks: state.notebooks.map((notebook) =>
                    notebook.id === action.payload.id
                        ? { ...notebook, name: action.payload.name }
                        : notebook
                ),
            };
        case "setPagination":
            return {
                ...state,
                notebookMeta: action.payload,
            };
        default:
            return state;
    }
};

const NotebookContext = createContext<NotebookData>(notebookData);

const NotebookProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data, loading } = useQuery(GET_NOTEBOOKS, {
        variables: {
            page: 1,
            limit: 5,
        },
    });

    const notebooks_data = data?.notebooks as IGetNotebook;

    const [state, dispatch] = useReducer(notebookReducer, notebookState);
    const [searchParams, setSearchParams] = useSearchParams();
    const dataService = new DataService<Notebook>("notebooks");

    const notebookId = searchParams.get("notebookId") as string;

    useEffect(() => {
        if (!loading) {
            dispatch({
                type: "setNotebooks",
                payload: notebooks_data.notebooks,
            });
            dispatch({
                type: "setPagination",
                payload: notebooks_data.notebookMeta,
            });
        }
    }, [notebooks_data, loading]);

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
