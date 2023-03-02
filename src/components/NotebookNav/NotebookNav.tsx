import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useModalContext } from "../../contexts/modalCtx";
import scss from "./notebookNav.module.scss";
import { HiPlus } from "react-icons/hi";
import CreateModal from "../CreateNotebook/CreateModal";
import { useNotebookContext } from "../../contexts/notebookCtx";

const NotebookNav = () => {
    const { name, openModal } = useModalContext()!;
    const { notebooks } = useNotebookContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const notebookId = searchParams.get("notebookId");

    useEffect(() => {
        if (notebookId === "undefined" || !notebookId) {
            const firstNotebookId = notebooks[0]?.id;

            setSearchParams({ notebookId: firstNotebookId });
        }
    }, [notebookId]);

    const selectNotebookHandler = (id: string) => {
        setSearchParams({ notebookId: id });
    };

    const openModalAction = () => {
        openModal("createNotebook");
    };

    return (
        <nav>
            <button id={scss["float-btn"]} onClick={openModalAction}>
                <HiPlus />
            </button>
            {notebooks.map(({ id, name }) => (
                <button
                    key={id}
                    className={`${scss["notebook-btn"]} ${
                        notebookId === id ? scss.active : ""
                    }`}
                    id={scss["note-title"]}
                    onClick={() => selectNotebookHandler(id)}
                >
                    {name}
                </button>
            ))}

            {name === "createNotebook" ? <CreateModal /> : null}
        </nav>
    );
};

export default NotebookNav;
