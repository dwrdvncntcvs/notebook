import React from "react";
import { useModalContext } from "../../contexts/modalCtx";
import scss from "./notebookNav.module.scss";
import { HiPlus } from "react-icons/hi";
import CreateModal from "../CreateNotebook/CreateModal";
import { useNotebookContext } from "../../contexts/notebookCtx";

const NotebookNav = () => {
    const { state, openModal } = useModalContext()!;
    const { notebooks } = useNotebookContext();

    return (
        <nav>
            <button id={scss["float-btn"]} onClick={() => openModal()}>
                <HiPlus />
            </button>
            {notebooks.map(({ id, name }) => (
                <button
                    key={id}
                    className={scss.active}
                    id={scss["note-title"]}
                >
                    {name}
                </button>
            ))}

            {state === "open" ? <CreateModal /> : null}
        </nav>
    );
};

export default NotebookNav;
