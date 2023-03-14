import React, { FC } from "react";
import { INoteAction } from "./Notes";
import scss from "./notesAction.module.scss";

interface NotesActionProps {
    notesActions: INoteAction[];
}

const NotesAction: FC<NotesActionProps> = ({ notesActions }) => {
    return (
        <>
            {notesActions.map(({ Icon, action, id, isSelected }) =>
                isSelected ? (
                    <button id={id} onClick={action}>
                        <Icon />
                    </button>
                ) : null
            )}
        </>
    );
};

export default NotesAction;
