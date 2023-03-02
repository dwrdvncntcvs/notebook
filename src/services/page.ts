import { Page } from "../models/Page";

interface PageDictionary {
    [key: string]: Page[];
}

interface PageInterface {
    getAllNotebookPage: (notebookId: string) => Page[];
    createPage: (page: Page) => void;
}

export default class PageService implements PageInterface {
    getAllNotebookPage(notebookId: string): Page[] {
        const pages = JSON.parse(
            localStorage.getItem("pages")!
        ) as PageDictionary;

        const notebookPages = pages[notebookId];

        return notebookPages;
    }

    createPage(page: Page): void {
        const pages = JSON.parse(
            localStorage.getItem("pages")!
        ) as PageDictionary;

        if (!pages[page.notebookId]) {
            pages[page.notebookId] = [];
        }

        pages[page.notebookId].push(page);

        localStorage.setItem("pages", JSON.stringify(pages));
    }
}
