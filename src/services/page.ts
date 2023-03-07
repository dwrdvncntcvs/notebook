import { Page } from "../models/Page";

interface PageDictionary {
    [key: string]: Page[];
}

interface PageInterface {
    getAllPages: () => PageDictionary;
    getAllNotebookPage: (notebookId: string) => Page[];
    createPage: (page: Page) => void;
    deletePageByNotebookId: (notebookId: string) => void;
}

export default class PageService implements PageInterface {
    constructor() {}

    getAllPages() {
        return JSON.parse(localStorage.getItem("pages")!) as PageDictionary;
    }

    getAllNotebookPage(notebookId: string): Page[] {
        const pages = this.getAllPages();

        const notebookPages = pages[notebookId];

        return notebookPages;
    }

    createPage(page: Page): void {
        const pages = this.getAllPages();

        if (!pages[page.notebookId]) {
            pages[page.notebookId] = [];
        }

        pages[page.notebookId].push(page);

        localStorage.setItem("pages", JSON.stringify(pages));
    }

    deletePageByNotebookId(notebookId: string) {
        const pages = this.getAllPages();

        delete pages[notebookId];

        localStorage.setItem("pages", JSON.stringify(pages));
    }
}
