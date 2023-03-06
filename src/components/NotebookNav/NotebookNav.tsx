import React from "react";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import scss from "./notebookNav.module.scss";
import { HiPlus } from "react-icons/hi";
import CreateModal from "../CreateNotebook/CreateModal";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { HiX } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

const NotebookNav = () => {
    const { name, openModal } = useModalContext()!;
    const { notebooks, notebookId, deleteNotebook, selectNotebook } =
        useNotebookContext();
    const [_, setSearchParams] = useSearchParams();

    const openModalAction = () => {
        openModal(MODAL.CREATE_NOTEBOOK);
    };

    const deleteNotebookAction = (id: string) => {
        const prevNotebook = notebooks[notebooks.length - 2];
        deleteNotebook(id);
        if (notebooks.length <= 1) {
            setSearchParams({});
            return;
        }
        selectNotebook(prevNotebook.id);
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
                        onClick={() => selectNotebook(id)}
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
