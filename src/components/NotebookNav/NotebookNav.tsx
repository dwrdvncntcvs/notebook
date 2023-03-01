import React from "react";
import scss from "./notebookNav.module.scss";

const NotebookNav = () => {
    return (
        <nav>
            <button id={scss["float-btn"]}>+</button>
            <button className={scss.active} id={scss["note-title"]}>
                Sample Note
            </button>
        </nav>
    );
};

export default NotebookNav;
