import { Page } from "../models/Page";

interface PageData {
    pages: Page[];
    createNotebookPage: (page: Page) => void;
    pageId: string;
    deleteNotebookPageById: (notebookId: string, pageId: string) => void;
    selectPage: (pageId: string) => void;
    updateNotebookPage: (notebookId: string, page: Page) => void;
}
interface PageState {
    pages: Page[];
    pageId: string;
}

type Action =
    | {
          type: "setPages";
          payload: Page[];
      }
    | {
          type: "setPageId";
          payload: string;
      }
    | {
          type: "createPage";
          payload: Page;
      }
    | {
          type: "deletePage";
          payload: string;
      }
    | {
          type: "updatePage";
          payload: Page;
      };

export { PageData, PageState, Action };
