const nb = require("../../model/Notebook");
const pg = require("../../model/Page");

const typeDef = `
    type Query {
        notebooks(page: Int, limit: Int): PaginatedNotebook
        pages(notebookId: String!,page:Int, limit: Int): PaginatedPages
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

const resolvers = {
    notebooks: async (_, args) => {
        const { page, limit } = args;
        try {
            const notebooks = await nb.findAll(page, limit);
            return notebooks;
        } catch (err) {
            return err;
        }
    },
    pages: async (_, args) => {
        const { page, limit, notebookId } = args;
        try {
            const pages = await pg.findAll(notebookId, page, limit);
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
