import React from "react";
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

    return (
        <main
            className={`${scss.main} ${
                pages === undefined ? scss["main-max-height"] : ""
            } ${notebooks.length === 0 ? scss["main-max-width"] : ""} `}
        >
            {notes ? (
                notes.map(({ createdAt, id, note }) => (
                    <div key={id} className={scss.note}>
                        <p>{note}</p>
                        <p>{formatDate(createdAt)}</p>
                    </div>
                ))
            ) : (
                <NoNotes />
            )}
        </main>
    );
};

export default Notes;
