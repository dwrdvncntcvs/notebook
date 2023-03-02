import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import CreateNotes from "./components/CreateNotes/CreateNotes";
import Header from "./components/Header/Header";
import NotebookNav from "./components/NotebookNav/NotebookNav";
import Notes from "./components/Notes/Notes";
import PagesAside from "./components/PagesAside/PagesAside";
import { InitialData, initLocalStorageData } from "./utils/initialize";

const storageDataArray: InitialData[] = [
    {
        name: "notebooks",
        value: [],
    },
    {
        name: "pages",
        value: {},
    },
    {
        name: "notes",
        value: {},
    },
];

function App() {
    useEffect(() => {
        initLocalStorageData(storageDataArray);
    }, []);

    return (
        <BrowserRouter>
            <div className="main">
                <Header />
                <NotebookNav />
                <PagesAside />
                <Notes />
                <CreateNotes />
                <ToastContainer autoClose={2000} position="bottom-right" />
            </div>
        </BrowserRouter>
    );
}

export default App;
