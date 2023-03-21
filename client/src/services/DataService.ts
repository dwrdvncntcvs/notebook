import Note, { INote } from "../models/Note";
import { Notebook } from "../models/Notebook";
import { IPage, Page } from "../models/Page";

export enum PREFIX {
    nb = "nb-",
    p = "p-",
    n = "n-",
}

export default class DataService<T extends Note | Notebook | Page> {
    private name: string;
    private data: T extends Notebook ? Notebook[] : IPage | INote;

    constructor(name: string) {
        this.name = name;
        this.data = JSON.parse(localStorage.getItem(this.name)!);
    }

    getAll(): Notebook[];
    getAll(param: string): Page[] | Note[];
    getAll(param?: string): Notebook[] | Note[] | Page[] {
        if (param) {
            if (param.startsWith(PREFIX.nb))
                return this.getAllPage(this.removePrefix(PREFIX.nb, param));

            if (param.startsWith(PREFIX.p))
                return this.getAllNote(this.removePrefix(PREFIX.p, param));
        }

        return this.getAllNotebooks() as Notebook[];
    }

    create(param: Notebook | Page | Note): void {
        if (param instanceof Notebook) this.createNotebook(param);
        else this.createPageOrNote(param);
    }

    update(id: string, param: string): void;
    update(id: string, param: Page | Note): void;
    update(id: string, param: Page | Note | string) {
        if (typeof param !== "string") {
            this.updatePageOrNote(id, param);
        } else this.updateNotebook(id, param);
    }

    delete(param1: string): void;
    delete(param1: string, param2: string): void;
    delete(param1: string, param2?: string) {
        if (!param2) {
            this.deleteNotebook(param1);
            return;
        }

        this.deletePageOrNote(param1, param2);
    }

    private deleteNotebook(notebookId: string) {
        const notebooks = this.data as Notebook[];

        const updatedNotebooks = notebooks.filter(
            ({ id }) => id !== notebookId
        );

        this.deleteAllPages(notebookId);

        localStorage.setItem(this.name, JSON.stringify(updatedNotebooks));
    }

    private deletePageOrNote(p_id: string, s_id: string) {
        const itemObject = this.data as IPage | INote;
        const itemValue = itemObject[p_id];

        let filteredItems: Page[] | Note[];

        if (this.name === "pages") {
            this.deleteNoteByPageId(s_id);

            filteredItems = (itemValue as Page[]).filter(
                ({ id }) => id !== s_id
            );
        } else if (this.name === "notes") {
            filteredItems = (itemValue as Note[]).filter(
                ({ id }) => id !== s_id
            );
        }

        if (filteredItems!.length < 1) {
            delete itemObject[p_id];
            return localStorage.setItem(this.name, JSON.stringify(itemObject));
        }

        itemObject[p_id] = filteredItems!;
        localStorage.setItem(this.name, JSON.stringify(itemObject));
    }

    private deleteAllPages(notebookId: string) {
        const pages = JSON.parse(localStorage.getItem("pages")!) as IPage;

        for (let { id } of pages[notebookId]) this.deleteNoteByPageId(id);

        delete pages[notebookId];

        localStorage.setItem("pages", JSON.stringify(pages));
    }

    private deleteNoteByPageId(pageId: string) {
        const notes = JSON.parse(localStorage.getItem("notes")!) as INote;

        delete notes[pageId];

        localStorage.setItem("notes", JSON.stringify(notes));
    }

    private getAllNotebooks() {
        const data = this.data as Notebook[];
        return data;
    }

    private getAllPage(notebookId: string): Page[] {
        const allPages = this.data as IPage;
        const pages = allPages[notebookId];
        return pages;
    }

    private getAllNote(pageId: string): Note[] {
        const allNotes = this.data as INote;
        const notes = allNotes[pageId];
        return notes;
    }

    private removePrefix(prefix: string, param: string): string {
        return param.split(prefix).reverse()[0];
    }

    private createNotebook(notebook: Notebook) {
        const notebooks = [...(this.data as Notebook[]), notebook];

        localStorage.setItem(this.name, JSON.stringify(notebooks));
    }

    private createPageOrNote(item: Page | Note): void {
        const items = this.data as IPage | INote;

        if (item instanceof Page) {
            if (!items[item.notebookId]) {
                items[item.notebookId] = [];
            }

            (items as IPage)[item.notebookId].push(item);
        }

        if (item instanceof Note) {
            if (!items[item.pageId]) {
                items[item.pageId] = [];
            }

            (items as INote)[item.pageId].push(item);
        }

        localStorage.setItem(this.name, JSON.stringify(items));
    }

    private updateNotebook(id: string, name: string) {
        const notebooks = this.data as Notebook[];

        const updatedNotebooks = notebooks.map((nb) =>
            nb.id === id ? { ...nb, name } : nb
        );

        localStorage.setItem(this.name, JSON.stringify(updatedNotebooks));
    }

    private updatePageOrNote(id: string, item: Page | Note) {
        const items = this.data as IPage | INote;

        if ("pageId" in item) {
            items[id] = (items as INote)[id].map((note) =>
                note.id === item.id ? item : note
            );

            console.log(items);
        }

        if ("notebookId" in item) {
            items[id] = (items as IPage)[id].map((page) =>
                page.id === item.id ? item : page
            );
        }
        localStorage.setItem(this.name, JSON.stringify(items));
    }
}
