const typeDefs = `
    type Note {
        id: String!
        note: String
        pageId: String!
        createdAt: String
        updatedAt: String
    }

    type PaginatedNotes {
        id: String!
        notes: [Note]
        noteMeta: PaginatedMeta
    }
`;

const resolvers = {};

module.exports = {
    typeDefs,
    resolvers,
};
