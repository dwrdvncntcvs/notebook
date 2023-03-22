const { resolvers: NotebookResolvers } = require("./Notebook");
const { resolvers: PageResolvers } = require("./Page");
const { resolvers: NoteResolvers } = require("./Notes");

const typeDefs = `
    type Mutation  {
        createNotebook(name: String): Notebook
        updateNotebook(id: String!, name: String): Notebook
        deleteNotebook(id: String): DeletedMessage

        createPage(notebookId: String, name: String): Page
        updatePage(id: String!, name: String): Page
        deletePage(id: String): DeletedMessage

        createNote(pageId: String, data: NoteInput): Note
        updateNote(id: String, data: NoteInput): Note
        deleteNote(id: String): DeletedMessage
    }
 `;

const resolvers = {
    ...NotebookResolvers,
    ...PageResolvers,
    ...NoteResolvers,
};

module.exports = {
    typeDefs,
    resolvers,
};
