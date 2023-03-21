const { create, remove, update, Page } = require("../../model/Page");
const { DataService } = require("../../service/dataService");

const typeDefs = `
    type Page {
        id: String!
        name: String
        notebookId: String!
        createdAt: String
        updatedAt: String
    }

    type PaginatedPages {
        id: String!
        pages: [Page]
        pageMeta: PaginatedMeta
    }
`;

const pageService = new DataService("page", Page);

const resolvers = {
    createPage: async (_, args) => {
        const { name, notebookId } = args;

        try {
            const createdPage = await pageService.create({ notebookId, name });
            return createdPage;
        } catch (err) {
            return err;
        }
    },
    updatePage: async (_, args) => {
        const { id, name } = args;

        try {
            const updatedPage = await pageService.update(id, { name });
            return updatedPage;
        } catch (err) {
            return err;
        }
    },
    deletePage: async (_, args) => {
        const { id } = args;

        try {
            const deleteMessage = await pageService.delete(id);
            return deleteMessage;
        } catch (err) {
            return err;
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
