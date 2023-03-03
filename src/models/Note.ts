import { v4 } from "uuid";

export default class Note {
    id: string;
    note: string;
    pageId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(note: string, pageId: string) {
        this.id = v4();
        this.note = note;
        this.pageId = pageId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
