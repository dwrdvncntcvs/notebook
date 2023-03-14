import React from "react";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import scss from "./notebookNav.module.scss";
import { HiPlus } from "react-icons/hi";
import CreateModal from "../CreateNotebook/CreateModal";
import { useNotebookContext } from "../../contexts/notebookCtx";

import NotebookTab from "./NotebookTab";

const NotebookNav = () => {
    const { name: modalName, openModal } = useModalContext()!;
    const { notebooks } = useNotebookContext();

    const openModalAction = () => {
        openModal(MODAL.CREATE_NOTEBOOK);
    };

    const createModal =
        modalName === MODAL.CREATE_NOTEBOOK ? <CreateModal /> : null;

    return (
        <nav>
            <button id={scss["float-btn"]} onClick={openModalAction}>
                <HiPlus />
            </button>
            {notebooks.map(({ id, name }) => (
                <NotebookTab notebook={{ id, name }} key={id} />
            ))}

            {createModal}
        </nav>
    );
};

export default NotebookNav;
