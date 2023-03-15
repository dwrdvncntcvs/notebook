const { create, update, remove } = require("../../model/Notebook");

const typeDefs = `
    type Notebook {
        id: String!
        name: String
        createdAt: String
        updatedAt: String
    }

    type DeletedNotebook {
        deleted: Boolean
        message: String
    }

    type PaginatedNotebook {
        notebooks: [Notebook]
        notebooksMeta: PaginatedMeta
    }

    
`;

const resolvers = {
    createNotebook: async (_, args) => {
        const { name } = args;

        try {
            const createdNotebook = await create({ name });
            return createdNotebook;
        } catch (err) {
            return err;
        }
    },
    updateNotebook: async (_, args) => {
        const { id, name } = args;

        try {
            const updatedNotebook = await update(id, { name });
            return updatedNotebook;
        } catch (err) {
            return err;
        }
    },
    deleteNotebook: async (_, args) => {
        const { id } = args;

        try {
            const deletedMessage = await remove(id);
            return deletedMessage;
        } catch (err) {
            return err;
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
