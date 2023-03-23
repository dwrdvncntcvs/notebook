import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ModalProvider } from "./contexts/modalCtx";
import { NotebookProvider } from "./contexts/notebookCtx";
import { PageProvider } from "./contexts/pageCtx";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./contexts/noteCtx";
import { ApolloProvider } from "@apollo/client/react";
import client from "./graphql/config";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <NotebookProvider>
                <PageProvider>
                    <NoteProvider>
                        <ModalProvider>
                            <App />
                        </ModalProvider>
                    </NoteProvider>
                </PageProvider>
            </NotebookProvider>
        </ApolloProvider>
    </BrowserRouter>
);
