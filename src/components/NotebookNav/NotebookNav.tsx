import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import scss from "./notebookNav.module.scss";
import { HiPlus } from "react-icons/hi";
import CreateModal from "../CreateNotebook/CreateModal";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { HiX } from "react-icons/hi";
import { Notebook } from "../../models/Notebook";

const NotebookNav = () => {
    const { name, openModal } = useModalContext()!;
    const { notebooks, notebookId, deleteNotebook } = useNotebookContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectNotebookHandler = (id: string) => {
        setSearchParams({ notebookId: id });
    };

    const openModalAction = () => {
        openModal(MODAL.CREATE_NOTEBOOK);
    };

    const deleteNotebookAction = (id: string) => {
        const prevNotebook = notebooks[notebooks.length - 2];
        deleteNotebook(id);
        selectNotebookHandler(prevNotebook.id);
    };

    return (
        <nav>
            <button id={scss["float-btn"]} onClick={openModalAction}>
                <HiPlus />
            </button>
            {notebooks.map(({ id, name }) => (
                <div
                    key={id}
                    className={`${scss["notebook-tab"]} ${
                        notebookId === id ? scss.active : ""
                    }`}
                >
                    <div
                        className={scss["notebook-tab-item"]}
                        id={scss["note-title"]}
                        onClick={() => selectNotebookHandler(id)}
                    >
                        {name}
                    </div>
                    <button
                        hidden={notebookId !== id}
                        onClick={() => {
                            deleteNotebookAction(id);
                        }}
                    >
                        <HiX />
                    </button>
                </div>
            ))}

            {name === MODAL.CREATE_NOTEBOOK ? <CreateModal /> : null}
        </nav>
    );
};

export default NotebookNav;
