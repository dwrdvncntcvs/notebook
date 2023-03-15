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
`;

module.exports = {
    typeDefs,
};
