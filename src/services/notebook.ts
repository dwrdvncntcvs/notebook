import { Notebook } from "../models/Notebook";
import { NotebookInterface } from "../types/services";
import PageService from "./page";

export default class NotebookService implements NotebookInterface {
    private n = "notebooks";
    private pageService: PageService;

    constructor() {
        this.pageService = new PageService();
    }

    getAll(): Notebook[] {
        const notebooks = JSON.parse(
            localStorage.getItem(this.n)!
        ) as Notebook[];

        return notebooks;
    }

    create(notebook: Notebook): void {
        const notebooks = JSON.parse(
            localStorage.getItem(this.n)!
        ) as Notebook[];

        localStorage.setItem(this.n, JSON.stringify([...notebooks, notebook]));
    }

    delete(id: string) {
        const notebooks = JSON.parse(
            localStorage.getItem(this.n)!
        ) as Notebook[];

        const updatedNotebooks = notebooks.filter(
            (notebook) => notebook.id !== id
        );

        this.pageService.deletePageByNotebookId(id);

        localStorage.setItem("notebooks", JSON.stringify(updatedNotebooks));
    }

    update(id: string, name: string) {
        const notebooks = JSON.parse(
            localStorage.getItem(this.n)!
        ) as Notebook[];

        const updatedNotebooks = notebooks.map((notebook) =>
            notebook.id === id ? { id, name } : notebook
        );

        localStorage.setItem(this.n, JSON.stringify(updatedNotebooks));
    }
}
