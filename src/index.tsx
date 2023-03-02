import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ModalProvider } from "./contexts/modalCtx";
import { NotebookProvider } from "./contexts/notebookCtx";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <NotebookProvider>
        <ModalProvider>
            <App />
        </ModalProvider>
    </NotebookProvider>
);
