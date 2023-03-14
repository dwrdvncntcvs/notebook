require("dotenv").config();

const express = require("express");
const eGql = require("express-graphql");
const cors = require("cors");
const { mongoDbConnect } = require("./model/config");
const { schema } = require("./graphql/schema");

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use(
    "/graphql",
    eGql.graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(PORT, async () => {
    console.log("-- Server Up --");
    console.log(`-- @PORT: ${PORT} --`);
    console.log(`-- URI: http://localhost:${PORT}/graphql --`);
    await mongoDbConnect(MONGO_URI);
});
