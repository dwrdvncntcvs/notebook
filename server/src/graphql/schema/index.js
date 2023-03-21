const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs: NotebookDefs } = require("./Notebook");
const { typeDef: QueryDefs, resolvers: QueryResolvers } = require("./Query");
const {
    typeDefs: MutationDefs,
    resolvers: MutationResolvers,
} = require("./Mutation");
const { typeDefs: PageTypeDefs } = require("./Page");
const { typeDefs: NoteTypeDefs } = require("./Notes");

const schema = makeExecutableSchema({
    typeDefs: [
        MutationDefs,
        NotebookDefs,
        QueryDefs,
        PageTypeDefs,
        NoteTypeDefs,
    ],
    resolvers: { Query: QueryResolvers, Mutation: MutationResolvers },
});

module.exports = {
    schema,
};
