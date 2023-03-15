const { findAll } = require("../../model/Notebook");

const typeDef = `
    type Query {
        notebooks(page: Int, limit: Int): PaginatedNotebook
    }
`;

const resolvers = {
    notebooks: async (_, args) => {
        const { page, limit } = args;
        try {
            const notebook = await findAll(page, limit);
            return notebook;
        } catch (err) {
            return err;
        }
    },
};

module.exports = {
    typeDef,
    resolvers,
};
