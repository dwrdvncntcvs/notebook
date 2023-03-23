import { PageMeta } from "../graphql/type";
import { Notebook } from "../models/Notebook";
import { PageData } from "./pageCtx";

interface NotebookData {
    notebooks: Notebook[];
    createNotebook: (notebook: Notebook) => void;
    deleteNotebook: (id: string) => void;
    selectNotebook: (id: string) => void;
    updateNotebook: (id: string, name: string) => void;
    notebookId: string;
    notebookMeta: PageMeta;
}

interface NotebookState {
    notebooks: Notebook[];
    notebookId: string;
    notebookMeta: PageMeta;
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
      }
    | {
          type: "setPagination";
          payload: PageMeta;
      };

export { NotebookData, Action, NotebookState };
