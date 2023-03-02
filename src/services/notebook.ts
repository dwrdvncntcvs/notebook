import { Notebook } from "../models/Notebook";

interface NotebookInterface {
    getAll: () => Notebook[];
    create: (notebook: Notebook) => void;
}

export default class NotebookService implements NotebookInterface {
    n = "notebooks";

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
}
