import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useCallback,
    useEffect,
    useReducer,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Page } from "../models/Page";
import DataService, { PREFIX } from "../services/DataService";
import PageService from "../services/page";
import { Action, PageData, PageState } from "../types/pageCtx";

const pageData: PageData = {
    pages: [],
    createNotebookPage: (page: Page) => {},
    pageId: "",
    deleteNotebookPageById: (notebookId: string, pageId: string) => {},
    selectPage: (pageId: string) => {},
    updateNotebookPage: (notebookId: string, page: Page) => {},
};

const pageState = {
    pages: [],
    pageId: "",
};

const pageReducer = (state: PageState, action: Action) => {
    switch (action.type) {
        case "setPages":
            return { ...state, pages: action.payload };
        case "setPageId":
            return { ...state, pageId: action.payload };
        case "createPage":
            return { ...state, pages: [...state.pages, action.payload] };
        case "deletePage":
            return {
                ...state,
                pages: state.pages.filter(({ id }) => id !== action.payload),
            };
        case "updatePage":
            return {
                ...state,
                pages: state.pages.map((page) =>
                    page.id === action.payload.id ? { ...action.payload } : page
                ),
            };
        default:
            return state;
    }
};

const PageContext = createContext<PageData>(pageData);

const PageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, pageState);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageService = new PageService();
    const dataService = new DataService<Page>("pages");

    const notebookId = searchParams.get("notebookId") as string;
    const pageId = searchParams.get("page") as string;

    const getAllPages = useCallback(() => {
        if (!notebookId) return;

        const allPages =
            (dataService.getAll(`${PREFIX.nb}${notebookId}`) as Page[]) || [];
        dispatch({ type: "setPageId", payload: pageId });
        dispatch({ type: "setPages", payload: allPages });
    }, [notebookId, pageId]);

    useEffect(() => {
        getAllPages();
        // console.log();
    }, [getAllPages]);

    useEffect(() => {
        const checkPages = () => {
            if (state.pages.length < 1) {
                setSearchParams({ notebookId });
                return;
            }

            const firstPageId = state.pages[0].id;

            setSearchParams({
                notebookId,
                page: !state.pageId ? firstPageId : pageId,
            });
        };

        checkPages();
    }, [state.pages, notebookId]);

    const createNotebookPage = (page: Page) => {
        dataService.create(page);
        setSearchParams({ notebookId, page: page.id });
        dispatch({ type: "createPage", payload: page });
        dispatch({ type: "setPageId", payload: page.id });
    };

    const deleteNotebookPageById = (notebookId: string, pageId: string) => {
        pageService.deleteNotebookPageByPageId(notebookId, pageId);
        dispatch({ type: "deletePage", payload: pageId });
    };

    const selectPage = (pageId: string) => {
        dispatch({ type: "setPageId", payload: pageId });
        setSearchParams({ notebookId, page: pageId });
    };

    const updateNotebookPage = (notebookId: string, page: Page) => {
        dataService.update(notebookId, page);
        dispatch({ type: "updatePage", payload: page });
    };

    return (
        <PageContext.Provider
            value={{
                ...state,
                createNotebookPage,
                deleteNotebookPageById,
                selectPage,
                updateNotebookPage,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

const usePageContext = () => {
    return useContext(PageContext);
};

export { PageContext, PageProvider, usePageContext };
