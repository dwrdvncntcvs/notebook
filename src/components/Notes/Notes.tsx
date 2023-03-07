import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { useNoteContext } from "../../contexts/noteCtx";
import { usePageContext } from "../../contexts/pageCtx";
import { formatDate } from "../../utils/helper";
import NoNotes from "../NoNotes/NoNotes";
import scss from "./notes.module.scss";

const Notes = () => {
    const { notes } = useNoteContext();
    const { pages } = usePageContext();
    const { notebooks } = useNotebookContext();

    const noNotebooksClass =
        notebooks.length === 0
            ? `${scss["main-max-width"]} ${scss["border-none"]}`
            : "";

    const noPagesClass = pages === undefined ? scss["main-max-height"] : "";

    return (
        <main className={`${scss.main} ${noPagesClass} ${noNotebooksClass} `}>
            {notes ? (
                notes.map(({ createdAt, id, note }) => (
                    <div key={id} className={scss.note}>
                        <div className={scss["note-content"]}>
                            <p>{note}</p>
                        </div>
                        <div className={scss["note-actions"]}>
                            <button id={scss.delete}>
                                <HiTrash />
                            </button>{" "}
                            <p>{formatDate(createdAt)}</p>
                        </div>
                    </div>
                ))
            ) : (
                <NoNotes />
            )}
        </main>
    );
};

export default Notes;
