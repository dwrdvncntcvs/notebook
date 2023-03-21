const nb = require("../../model/Notebook");
const pg = require("../../model/Page");
const { DataService } = require("../../service/dataService");

const typeDef = `
    type Query {
        notebooks(page: Int, limit: Int): PaginatedNotebook
        pages(notebookId: String!,page:Int, limit: Int): PaginatedPages
        notes(pageId: String!, page: Int, limit: Int): PaginatedNotes
    }

    type PaginatedMeta {
        page: Int
        count: Int
        totalPages: Int
    }

    type DeletedMessage {
        deleted: Boolean
        message: String
    }
`;

const pageDataService = new DataService("page", pg.Page);
const notebookDataService = new DataService("notebook", nb.Notebook);

const resolvers = {
    notebooks: async (_, args) => {
        const { page, limit } = args;
        try {
            const notebooks = await notebookDataService.findAll({
                page,
                limit,
            });
            return notebooks;
        } catch (err) {
            return err;
        }
    },
    pages: async (_, args) => {
        const { page, limit, notebookId } = args;
        try {
            const pages = await pageDataService.findAll(
                {
                    page,
                    limit,
                },
                {
                    notebookId,
                }
            );
            return pages;
        } catch (err) {
            return err;
        }
    },
};

module.exports = {
    typeDef,
    resolvers,
};
