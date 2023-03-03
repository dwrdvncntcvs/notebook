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
    notebookId: string;
    createNotebookPage: (page: Page) => void;
}

const pageData: PageData = {
    pages: [],
    notebookId: "",
    createNotebookPage: (page: Page) => {},
};

const PageContext = createContext<PageData>(pageData);

const PageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [searchParams] = useSearchParams();
    const pageService = new PageService();

    const notebookId = searchParams.get("notebookId");

    const getAllPages = useCallback(() => {
        if (!notebookId) return;

        const allPages = pageService.getAllNotebookPage(notebookId);
        setPages(allPages);
    }, [notebookId]);

    useEffect(() => {
        getAllPages();
    }, [getAllPages]);

    const createNotebookPage = (page: Page) => {
        pageService.createPage(page);
        getAllPages();
    };

    return (
        <PageContext.Provider
            value={{
                pages,
                notebookId: notebookId as string,
                createNotebookPage,
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
