import { PageMeta } from "../graphql/type";
import { Page } from "../models/Page";

interface PageData {
    pages: Page[];
    createNotebookPage: (page: Page) => void;
    pageId: string;
    deleteNotebookPageById: (pageId: string) => void;
    selectPage: (pageId: string) => void;
    updateNotebookPage: (page: Page) => void;
    pageMeta: PageMeta;
}
interface PageState {
    pages: Page[];
    pageId: string;
    pageMeta: PageMeta;
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
      }
    | {
          type: "setPagination";
          payload: PageMeta;
      };

export { PageData, PageState, Action };
