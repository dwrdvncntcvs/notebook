import React from "react";
import { IconType } from "react-icons";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { useNoteContext } from "../../contexts/noteCtx";
import { usePageContext } from "../../contexts/pageCtx";
import Note from "../../models/Note";
import { formatDate } from "../../utils/helper";
import NoNotes from "../NoNotes/NoNotes";
import NoteItem from "./NoteItem";
import scss from "./notes.module.scss";
import NotesAction from "./NotesAction";

const Notes = () => {
    const { notes } = useNoteContext();
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
                notes.map((note) => <NoteItem note={note} />)
            ) : (
                <NoNotes />
            )}
        </main>
    );
};

export default Notes;
