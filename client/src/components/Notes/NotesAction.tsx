import React, { FC } from "react";
import { INoteAction } from "./NoteItem";
import scss from "./notesAction.module.scss";

interface NotesActionProps {
    notesActions: INoteAction[];
}

const NotesAction: FC<NotesActionProps> = ({ notesActions }) => {
    return (
        <>
            {notesActions.map(({ Icon, action, id, isSelected }) =>
                isSelected ? (
                    <button key={id} id={id} onClick={action}>
                        <Icon />
                    </button>
                ) : null
            )}
        </>
    );
};

export default NotesAction;
