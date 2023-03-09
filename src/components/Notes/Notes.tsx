import React from "react";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { useNoteContext } from "../../contexts/noteCtx";
import { usePageContext } from "../../contexts/pageCtx";
import { formatDate } from "../../utils/helper";
import NoNotes from "../NoNotes/NoNotes";
import scss from "./notes.module.scss";

const Notes = () => {
    const {
        notes,
        noteId,
        deletePageNote,
        selectNote,
        unSelectNote,
    } = useNoteContext();
    const { pages } = usePageContext();
    const { notebooks } = useNotebookContext();

    const noNotebooksClass =
        notebooks.length === 0
            ? `${scss["main-max-width"]} ${scss["border-none"]}`
            : "";

    const noPagesClass = pages.length < 1 ? scss["main-max-height"] : "";

    return (
        <main className={`${scss.main} ${noPagesClass} ${noNotebooksClass} `}>
            {notes.length > 0 ? (
                notes.map(({ createdAt, id, note, pageId, updatedAt }) => (
                    <div key={id} className={scss.note}>
                        <div className={scss["note-content"]}>
                            <p>{note}</p>
                        </div>
                        <div className={scss["note-actions"]}>
                            {noteId !== id ? (
                                <>
                                    <button
                                        id={scss.edit}
                                        onClick={() => {
                                            selectNote({
                                                id,
                                                note,
                                                createdAt,
                                                pageId,
                                                updatedAt,
                                            });
                                        }}
                                    >
                                        <HiPencil />
                                    </button>
                                    <button
                                        id={scss.delete}
                                        onClick={() =>
                                            deletePageNote(pageId, id)
                                        }
                                    >
                                        <HiTrash />
                                    </button>
                                </>
                            ) : (
                                <button
                                    id={scss.cancel}
                                    onClick={() => unSelectNote(id)}
                                >
                                    <HiX />
                                </button>
                            )}
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
