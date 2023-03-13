import React from "react";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import scss from "./notebookNav.module.scss";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import CreateModal from "../CreateNotebook/CreateModal";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { useSearchParams } from "react-router-dom";
import { getDataPreviousValue } from "../../utils/helper";
import { Notebook } from "../../models/Notebook";
import UpdateNotebook from "../UpdateNotebook/UpdateNotebook";

const NotebookNav = () => {
    const { name: modalName, openModal } = useModalContext()!;
    const { notebooks, notebookId, deleteNotebook, selectNotebook } =
        useNotebookContext();
    const [_, setSearchParams] = useSearchParams();

    const openModalAction = () => {
        openModal(MODAL.CREATE_NOTEBOOK);
    };

    const deleteNotebookAction = (id: string) => {
        const prevNotebook = getDataPreviousValue<Notebook>(id, notebooks);
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
                        onClick={() => {
                            selectNotebook(id);
                        }}
                    >
                        {name}
                    </div>
                    <button
                        id={scss.edit}
                        hidden={notebookId !== id}
                        onClick={() => {
                            // deleteNotebookAction(id);
                            openModal(MODAL.UPDATE_NOTEBOOK);
                        }}
                    >
                        <HiPencil />
                    </button>
                    <button
                        id={scss.delete}
                        hidden={notebookId !== id}
                        onClick={() => {
                            deleteNotebookAction(id);
                        }}
                    >
                        <HiTrash />
                    </button>
                    {modalName === MODAL.UPDATE_NOTEBOOK &&
                    id === notebookId ? (
                        <UpdateNotebook notebook={{ id, name }} />
                    ) : null}
                </div>
            ))}

            {modalName === MODAL.CREATE_NOTEBOOK ? <CreateModal /> : null}
        </nav>
    );
};

export default NotebookNav;
