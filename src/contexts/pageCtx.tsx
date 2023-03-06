import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Page } from "../models/Page";
import PageService from "../services/page";

interface PageData {
    pages: Page[];
    createNotebookPage: (page: Page) => void;
    pageId: string;
}

const pageData: PageData = {
    pages: [],
    createNotebookPage: (page: Page) => {},
    pageId: "",
};

const PageContext = createContext<PageData>(pageData);

const PageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageService = new PageService();

    const notebookId = searchParams.get("notebookId") as string;
    const pageId = searchParams.get("page") as string;

    const getAllPages = useCallback(() => {
        if (!notebookId) return;

        const allPages = pageService.getAllNotebookPage(notebookId);
        setPages(allPages);
    }, [notebookId]);

    useEffect(() => {
        getAllPages();
    }, [getAllPages]);

    useEffect(() => {
        const checkPages = () => {
            if (!pages) return;

            if (!pageId || pageId === "undefined")
                setSearchParams({ notebookId, page: pages[0]?.id });
        };

        checkPages();
    }, [pages]);

    const createNotebookPage = (page: Page) => {
        pageService.createPage(page);
        getAllPages();
    };

    return (
        <PageContext.Provider
            value={{
                pages,
                createNotebookPage,
                pageId,
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
