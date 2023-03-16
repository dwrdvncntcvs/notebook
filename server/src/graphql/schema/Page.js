const { create, remove, update } = require("../../model/Page");

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

const resolvers = {
    createPage: async (_, args) => {
        const { name, notebookId } = args;

        try {
            const createdPage = await create({ notebookId, name });
            return createdPage;
        } catch (err) {
            return err;
        }
    },
    updatePage: async (_, args) => {
        const { id, name } = args;

        try {
            const updatedPage = await update(id, { name });
            return updatedPage;
        } catch (err) {
            return err;
        }
    },
    deletePage: async (_, args) => {
        const { id } = args;

        try {
            const deleteMessage = await remove(id);
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
