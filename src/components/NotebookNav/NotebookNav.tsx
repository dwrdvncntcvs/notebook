import React from "react";

const NotebookNav = () => {
    return (
        <nav>
            <button id="float-btn">+</button>
            <button className="active" id="note-title">
                Sample Note
            </button>
        </nav>
    );
};

export default NotebookNav;
