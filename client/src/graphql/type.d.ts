import Note from "../models/Note";
import { Notebook } from "../models/Notebook";
import { Page } from "../models/Page";

export interface TypeName {
    __typename?: string;
}

export interface PageMeta extends TypeName {
    page: number;
    count: number;
    totalPages: number;
}

export interface IGetNotebook extends TypeName {
    notebooks: Notebook[];
    notebookMeta: PageMeta;
}

export interface IGetPage extends TypeName {
    pages: Page[];
    pageMeta: PageMeta;
}

export interface IGetNote extends TypeName {
    notes: Note[];
    noteMeta: PageMeta;
}
