import { Notebook } from "../models/Notebook";

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
