import { createHttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const httpLink = createHttpLink({
    uri: "http://localhost:5000",
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
