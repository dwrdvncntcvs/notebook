import { Page } from "../models/Page";
import { NoteService } from "./note";

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
    private noteService: NoteService;

    constructor() {
        this.noteService = new NoteService();
    }

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

        if (pages[notebookId])
            for (let { id } of pages[notebookId])
                this.noteService.deleteNoteByPageId(id);

        delete pages[notebookId];

        localStorage.setItem("pages", JSON.stringify(pages));
    }
}
