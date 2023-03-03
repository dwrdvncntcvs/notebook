import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ModalProvider } from "./contexts/modalCtx";
import { NotebookProvider } from "./contexts/notebookCtx";
import { PageProvider } from "./contexts/pageCtx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <NotebookProvider>
            <PageProvider>
                <ModalProvider>
                    <App />
                </ModalProvider>
            </PageProvider>
        </NotebookProvider>
    </BrowserRouter>
);
