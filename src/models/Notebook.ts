import { v4 } from "uuid";

export class Notebook {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = v4();
        this.name = name;
    }
}
