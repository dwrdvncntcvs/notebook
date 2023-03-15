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

const resolvers = {};

module.exports = {
    typeDefs,
    resolvers,
};
