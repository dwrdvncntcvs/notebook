import { v4 } from "uuid";

export default class Note {
    id: string;
    notes: string;
    pageId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(notes: string, pageId: string) {
        this.id = v4();
        this.notes = notes;
        this.pageId = pageId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
