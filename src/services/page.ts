import { Page } from "../models/Page";

interface PageDictionary {
    [key: string]: Page[];
}

interface PageInterface {
    getAllNotebookPage: (notebookId: string) => Page[];
}

export default class PageService implements PageInterface {
    getAllNotebookPage(notebookId: string): Page[] {
        const pages = JSON.parse(
            localStorage.getItem("pages")!
        ) as PageDictionary;

        const notebookPages = pages[notebookId];

        return notebookPages;
    }
}
