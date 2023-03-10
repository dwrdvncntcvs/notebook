import { Page } from "../models/Page";
import { PageDictionary, PageInterface } from "../types/services";
import { NoteService } from "./note";

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

        return notebookPages || [];
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

    deleteNotebookPageByPageId(notebookId: string, pageId: string) {
        const pages = this.getAllPages();
        const notebookPages = this.getAllNotebookPage(notebookId);

        this.noteService.deleteNoteByPageId(pageId);

        const filteredNotebookPages = notebookPages.filter(
            (notebookPage) => notebookPage.id !== pageId
        );

        if (filteredNotebookPages.length <= 0) {
            delete pages[notebookId];
            localStorage.setItem("pages", JSON.stringify({ ...pages }));
            return;
        }

        pages[notebookId] = filteredNotebookPages;
        localStorage.setItem("pages", JSON.stringify({ ...pages }));
    }
}
