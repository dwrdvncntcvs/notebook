import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Page } from "../models/Page";
import { Action, PageData, PageState } from "../types/pageCtx";
import { useQuery, useMutation } from "@apollo/client";
import {
    CREATE_PAGE,
    DELETE_PAGE,
    GET_PAGES,
    UPDATE_PAGE,
} from "../graphql/pages";
import { IGetPage, PageMeta } from "../graphql/type";

const defaultPageMeta: PageMeta = {
    count: 0,
    page: 1,
    totalPages: 1,
};

const pageData: PageData = {
    pages: [],
    createNotebookPage: (page: Page) => {},
    pageId: "",
    deleteNotebookPageById: (pageId: string) => {},
    selectPage: (pageId: string) => {},
    updateNotebookPage: (page: Page) => {},
    pageMeta: defaultPageMeta,
};

const pageState: PageState = {
    pages: [],
    pageId: "",
    pageMeta: defaultPageMeta,
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
        case "setPagination":
            return {
                ...state,
                pageMeta: action.payload,
            };
        default:
            return state;
    }
};

const PageContext = createContext<PageData>(pageData);

const PageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, pageState);
    const [searchParams, setSearchParams] = useSearchParams();

    const [createP] = useMutation(CREATE_PAGE);
    const [updateP] = useMutation(UPDATE_PAGE);
    const [deleteP] = useMutation(DELETE_PAGE);

    const notebookId = searchParams.get("notebookId") as string;
    const pageId = searchParams.get("page") as string;

    const { data, refetch } = useQuery(GET_PAGES, {
        skip: !notebookId,
        variables: {
            notebookId,
            page: 1,
            limit: 5,
        },
    });

    useEffect(() => {
        if (data) {
            if (notebookId) refetch();
            const pagesData = data.pages as IGetPage;
            dispatch({ type: "setPageId", payload: pageId });
            dispatch({ type: "setPages", payload: pagesData.pages });
            dispatch({ type: "setPagination", payload: pagesData.pageMeta });
        }
    }, [data, pageId]);

    useEffect(() => {
        const checkPages = () => {
            if (state.pages.length < 1) {
                setSearchParams({ notebookId });
                return;
            }

            const currentPage = state.pages.find((cp) => cp.id === pageId);

            selectPage(!currentPage ? state.pages[0].id : pageId);
        };

        checkPages();
    }, [state.pages, notebookId, pageId]);

    const createNotebookPage = async (page: Page) => {
        try {
            const { data } = await createP({
                variables: { notebookId, name: page.name },
            });

            const pageData = data.createPage as Page;

            dispatch({ type: "createPage", payload: pageData });
            dispatch({ type: "setPageId", payload: pageData.id });
            setSearchParams({ notebookId, page: pageData.id });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteNotebookPageById = async (pageId: string) => {
        try {
            const data = await deleteP({ variables: { id: pageId } });
            dispatch({ type: "deletePage", payload: pageId });
        } catch (err) {
            console.log(err);
        }
    };

    const selectPage = (pageId: string) => {
        dispatch({ type: "setPageId", payload: pageId });
        setSearchParams({ notebookId, page: pageId });
    };

    const updateNotebookPage = async (page: Page) => {
        try {
            const { data } = await updateP({
                variables: {
                    id: page.id,
                    name: page.name,
                },
            });

            const updatePage = data.updatePage as Page;
            dispatch({ type: "updatePage", payload: updatePage });
        } catch (err) {
            console.log(err);
        }
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
