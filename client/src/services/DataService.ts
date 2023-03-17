import Note, { INote } from "../models/Note";
import { Notebook } from "../models/Notebook";
import { IPage, Page } from "../models/Page";

export enum PREFIX {
    nb = "nb-",
    p = "p-",
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

    delete() {}

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
