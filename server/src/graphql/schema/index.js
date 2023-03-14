const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs: NotebookDefs } = require("./Notebook");
const { typeDef: QueryDefs } = require("./Query");

const schema = makeExecutableSchema({
    typeDefs: [NotebookDefs, QueryDefs],
    resolvers: {},
});

module.exports = {
    schema,
};
