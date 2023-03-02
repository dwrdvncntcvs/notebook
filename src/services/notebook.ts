import { Notebook } from "../models/Notebook";

interface NotebookInterface {
    getAll: () => Notebook[];
}

export default class NotebookService implements NotebookInterface {
    getAll(): Notebook[] {
        const notebooks = JSON.parse(
            localStorage.getItem("notebooks")!
        ) as Notebook[];

        return notebooks;
    }
}
