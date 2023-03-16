const { resolvers: NotebookResolvers } = require("./Notebook");
const { resolvers: PageResolvers } = require("./Page");

const typeDefs = `
    type Mutation  {
        createNotebook(name: String): Notebook
        updateNotebook(id: String!, name: String): Notebook
        deleteNotebook(id: String): DeletedMessage

        createPage(name: String): Page
        updatePage(id: String!): Page
        deletePage(id: String): DeletedMessage
    }
 `;

const resolvers = {
    ...NotebookResolvers,
    ...PageResolvers,
};

module.exports = {
    typeDefs,
    resolvers,
};
