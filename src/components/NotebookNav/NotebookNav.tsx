import React from "react";
import { useModalContext } from "../../contexts/modalCtx";
import scss from "./notebookNav.module.scss";
import { HiPlus } from "react-icons/hi";
import CreateModal from "../CreateNotebook/CreateModal";

const NotebookNav = () => {
    const { state, openModal } = useModalContext()!;

    return (
        <nav>
            <button id={scss["float-btn"]} onClick={() => openModal()}>
                <HiPlus />
            </button>
            <button className={scss.active} id={scss["note-title"]}>
                Sample Note
            </button>

            {state === "open" ? <CreateModal /> : null}
        </nav>
    );
};

export default NotebookNav;
