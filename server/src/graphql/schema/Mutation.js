const { resolvers: NotebookResolvers } = require("./Notebook");

const typeDefs = `
    type Mutation  {
        createNotebook(name: String): Notebook
        updateNotebook(id: String!, name: String): Notebook
        deleteNotebook(id: String): DeletedNotebook
    }
 `;

const resolvers = {
    ...NotebookResolvers,
};

module.exports = {
    typeDefs,
    resolvers,
};
