require("dotenv").config();

const express = require("express");
const eGql = require("express-graphql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(
    "/graphql",
    eGql.graphqlHTTP({
        schema: [],
        graphiql: true,
    })
);

app.listen(PORT, () => {
    console.log("-- Server Up --");
    console.log(`-- @PORT: ${PORT} --`);
    console.log(`-- URI: http://localhost:${PORT}/graphql --`);
});
