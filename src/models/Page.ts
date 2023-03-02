import { v4 } from "uuid";

export class Page {
    id: string;
    name: string;
    notebookId: string;

    constructor(name: string, notebookId: string) {
        this.id = v4();
        this.name = name;
        this.notebookId = notebookId;
    }
}
