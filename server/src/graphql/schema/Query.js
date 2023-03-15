const { findAll } = require("../../model/Notebook");

const typeDef = `
    type Query {
        notebooks: [Notebook]
    }
`;

const resolvers = {
    notebooks: async () => {
        try {
            const notebooks = await findAll();
            return notebooks;
        } catch (err) {
            return err;
        }
    },
};

module.exports = {
    typeDef,
    resolvers,
};
