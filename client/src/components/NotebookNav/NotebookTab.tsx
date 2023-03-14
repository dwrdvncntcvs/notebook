import React, { FC } from "react";
import { IconType } from "react-icons";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { Notebook } from "../../models/Notebook";
import { getDataPreviousValue } from "../../utils/helper";
import UpdateNotebook from "../UpdateNotebook/UpdateNotebook";
import NavAction from "./NavAction";
import scss from "./notebookTab.module.scss";

interface NotebookProps {
    notebook: Notebook;
}

export interface NavActionProperties {
    id: string;
    hidden: boolean;
    action: () => void;
    Icon: IconType;
}

const NotebookTab: FC<NotebookProps> = ({ notebook }) => {
    const { name: modalName, openModal } = useModalContext()!;
    const { notebookId, selectNotebook, notebooks, deleteNotebook } = useNotebookContext();
    const [_, setSearchParams] = useSearchParams();

    const updateModal = (id: string) =>
        modalName === MODAL.UPDATE_NOTEBOOK && id === notebookId ? (
            <UpdateNotebook />
        ) : null;

    const deleteNotebookAction = (id: string) => {
        const prevNotebook = getDataPreviousValue<Notebook>(id, notebooks);
        deleteNotebook(id);
        if (notebooks.length <= 1) {
            setSearchParams({});
            return;
        }
        selectNotebook(prevNotebook.id);
    };

    const navActions = (
        id: string,
        notebook: Notebook
    ): NavActionProperties[] => [
        {
            id: scss.edit,
            hidden: notebookId !== id,
            action: () => {
                openModal(MODAL.UPDATE_NOTEBOOK, notebook);
            },
            Icon: HiPencil,
        },
        {
            id: scss.delete,
            hidden: notebookId !== id,
            action: () => {
                deleteNotebookAction(id);
            },
            Icon: HiTrash,
        },
    ];

    return (
        <div
            className={`${scss["notebook-tab"]} ${
                notebookId === notebook.id ? scss.active : ""
            }`}
        >
            <div
                className={scss["notebook-tab-item"]}
                id={scss["note-title"]}
                onClick={() => {
                    selectNotebook(notebook.id);
                }}
            >
                {notebook.name}
            </div>

            <NavAction
                navActionProperties={navActions(notebook.id, {
                    id: notebook.id,
                    name: notebook.name,
                })}
            />
            {updateModal(notebook.id)}
        </div>
    );
};

export default NotebookTab;
