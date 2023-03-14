import React, { FC } from "react";
import { IconType } from "react-icons";
import { HiPencil, HiTrash, HiX } from "react-icons/hi";
import { useNoteContext } from "../../contexts/noteCtx";
import Note from "../../models/Note";
import { formatDate } from "../../utils/helper";
import scss from "./noteItem.module.scss";
import NotesAction from "./NotesAction";

export interface INoteAction {
    id: string;
    action: () => void;
    isSelected: boolean;
    Icon: IconType;
}

interface NoteProps {
    note: Note;
}

const NoteItem: FC<NoteProps> = ({note}) => {
    const { noteId, deletePageNote, selectNote, unSelectNote } =
        useNoteContext();

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
        <div key={note.id} className={scss.note}>
            <div className={scss["note-content"]}>
                <p>{note.note}</p>
            </div>
            <div className={scss["note-actions"]}>
                <NotesAction notesActions={noteActions(note)} />
                <p>{formatDate(note.createdAt)}</p>
            </div>
        </div>
    );
};

export default NoteItem;
