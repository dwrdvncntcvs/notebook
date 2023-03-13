import { Notebook } from "../models/Notebook";

interface NotebookData {
    notebooks: Notebook[];
    createNotebook: (notebook: Notebook) => void;
    deleteNotebook: (id: string) => void;
    selectNotebook: (id: string) => void;
    updateNotebook: (id: string, name: string) => void;
    notebookId: string;
}

interface NotebookState {
    notebooks: Notebook[];
    notebookId: string;
}

type Action =
    | {
          type: "setNotebooks";
          payload: Notebook[];
      }
    | {
          type: "setNotebookId";
          payload: string;
      }
    | {
          type: "addNotebook";
          payload: Notebook;
      }
    | {
          type: "deleteNotebook";
          payload: string;
      }
    | {
          type: "updateNotebook";
          payload: { id: string; name: string };
      };

export { NotebookData, Action, NotebookState };
