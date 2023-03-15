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
        notebooksMeta: NotebooksMeta
    }

    type NotebooksMeta {
        page: Int
        count: Int
        totalPages: Int
    }
`;

module.exports = {
    typeDefs,
};
