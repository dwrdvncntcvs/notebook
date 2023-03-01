import React from "react";

import "./App.scss";
import CreateNotes from "./components/CreateNotes/CreateNotes";
import Header from "./components/Header/Header";
import NotebookNav from "./components/NotebookNav/NotebookNav";
import Notes from "./components/Notes/Notes";
import PagesAside from "./components/PagesAside/PagesAside";

function App() {
    return (
        <div className="main">
            <Header />
            <NotebookNav />
            <PagesAside />
            <Notes />
            <CreateNotes />
        </div>
    );
}

export default App;
