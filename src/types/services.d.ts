interface NoteDictionary {
    [key: string]: Note[];
}

interface NoteInterface {
    getAllPageNotes: (pageId: string) => Note[];
    getAllNotes: () => NoteDictionary;
    createNote: (note: Note) => void;
    deleteNoteByPageId: (pageId: string) => void;
    deletePageNoteById: (pageId: string, noteId: string) => void;
    updatePageNoteById: (pageId: string, note: Note) => void;
}

interface NotebookInterface {
    getAll: () => Notebook[];
    create: (notebook: Notebook) => void;
    delete: (notebookId: string) => void;
}

interface PageDictionary {
    [key: string]: Page[];
}

interface PageInterface {
    getAllPages: () => PageDictionary;
    getAllNotebookPage: (notebookId: string) => Page[];
    createPage: (page: Page) => void;
    deletePageByNotebookId: (notebookId: string) => void;
    deleteNotebookPageByPageId: (notebookId: string, pageId: string) => void;
}

export {
    NoteDictionary,
    NoteInterface,
    NotebookInterface,
    PageDictionary,
    PageInterface,
};
