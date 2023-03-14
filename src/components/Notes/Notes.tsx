import React from "react";
import { IconType } from "react-icons";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { useNoteContext } from "../../contexts/noteCtx";
import { usePageContext } from "../../contexts/pageCtx";
import Note from "../../models/Note";
import { formatDate } from "../../utils/helper";
import NoNotes from "../NoNotes/NoNotes";
import scss from "./notes.module.scss";
import NotesAction from "./NotesAction";

export interface INoteAction {
    id: string;
    action: () => void;
    isSelected: boolean;
    Icon: IconType;
}

const Notes = () => {
    const { notes, noteId, deletePageNote, selectNote, unSelectNote } =
        useNoteContext();
    const { pages } = usePageContext();
    const { notebooks } = useNotebookContext();

    const noNotebooksClass =
        notebooks.length === 0
            ? `${scss["main-max-width"]} ${scss["border-none"]}`
            : "";

    const noPagesClass = pages.length < 1 ? scss["main-max-height"] : "";

    const noteActions = (note: Note): INoteAction[] => [
        {
            id: scss.edit,
            Icon: HiPencil,
            action: () => {
                selectNote(note);
            },
            isSelected: noteId !== note.id,
        },
        {
            id: scss.delete,
            Icon: HiTrash,
            action: () => {
                deletePageNote(note.pageId, note.id);
            },
            isSelected: noteId !== note.id,
        },
        {
            id: scss.cancel,
            Icon: HiX,
            action: () => {
                unSelectNote(note.id);
            },
            isSelected: noteId === note.id,
        },
    ];

    return (
        <main className={`${scss.main} ${noPagesClass} ${noNotebooksClass} `}>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note.id} className={scss.note}>
                        <div className={scss["note-content"]}>
                            <p>{note.note}</p>
                        </div>
                        <div className={scss["note-actions"]}>
                            <NotesAction notesActions={noteActions(note)} />
                            <p>{formatDate(note.createdAt)}</p>
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
