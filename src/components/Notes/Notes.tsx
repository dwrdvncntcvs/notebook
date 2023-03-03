import React from "react";
import { useNoteContext } from "../../contexts/noteCtx";
import { formatDate } from "../../utils/helper";
import scss from "./notes.module.scss";

const Notes = () => {
    const { notes } = useNoteContext();

    return (
        <main className={scss.main}>
            <h2>Notes Title</h2>
            {notes ? (
                notes.map(({ createdAt, id, note }) => (
                    <div key={id} className={scss.note}>
                        <p>{note}</p>
                        <p>{formatDate(createdAt)}</p>
                    </div>
                ))
            ) : (
                <div>No notes found</div>
            )}
        </main>
    );
};

export default Notes;
