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
import PageService from "../services/page";

interface PageData {
    pages: Page[];
    createNotebookPage: (page: Page) => void;
    pageId: string;
    deleteNotebookPageById: (notebookId: string, pageId: string) => void;
    selectPage: (pageId: string) => void;
}

const pageData: PageData = {
    pages: [],
    createNotebookPage: (page: Page) => {},
    pageId: "",
    deleteNotebookPageById: (notebookId: string, pageId: string) => {},
    selectPage: (pageId: string) => {},
};

interface PageState {
    pages: Page[];
    pageId: string;
}

type Action =
    | {
          type: "setPages";
          payload: Page[];
      }
    | {
          type: "setPageId";
          payload: string;
      }
    | {
          type: "createPage";
          payload: Page;
      }
    | {
          type: "deletePage";
          payload: string;
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
        default:
            return state;
    }
};

const PageContext = createContext<PageData>(pageData);

const PageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, pageState);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageService = new PageService();

    const notebookId = searchParams.get("notebookId") as string;
    const pageId = searchParams.get("page") as string;

    const getAllPages = useCallback(() => {
        if (!notebookId) return;

        const allPages = pageService.getAllNotebookPage(notebookId);
        dispatch({ type: "setPageId", payload: pageId });
        dispatch({ type: "setPages", payload: allPages });
    }, [notebookId, pageId]);

    useEffect(() => {
        getAllPages();
    }, [getAllPages]);

    useEffect(() => {
        const checkPages = () => {
            if (!state.pages) return;

            if (!pageId || pageId === "undefined") {
                const firstPageId = state.pages[0]?.id;
                dispatch({ type: "setPageId", payload: firstPageId });

                setSearchParams({ notebookId, page: firstPageId });
            } else {
                dispatch({ type: "setPageId", payload: state.pageId });
            }
        };

        checkPages();
    }, [state.pages, state.pageId]);

    const createNotebookPage = (page: Page) => {
        pageService.createPage(page);
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

    return (
        <PageContext.Provider
            value={{
                ...state,
                createNotebookPage,
                deleteNotebookPageById,
                selectPage,
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
