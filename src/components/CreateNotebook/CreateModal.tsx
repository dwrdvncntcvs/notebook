import React, { FormEvent, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import Modal from "../../layouts/Modal/Modal";
import { Notebook } from "../../models/Notebook";
import scss from "./createModal.module.scss";

const Header = () => {
    return (
        <div className={scss.header}>
            <h2>Notebook</h2>
        </div>
    );
};

const Body = () => {
    const [notebookName, setNotebookName] = useState("");
    const { createNotebook } = useNotebookContext();
    const { closeModal } = useModalContext()!;

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!notebookName) {
            toast.error("Can't create a notebook with empty name");
            return;
        }

        const notebook = new Notebook(notebookName);
        createNotebook(notebook);
        setNotebookName("");
        closeModal();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNotebookName(e.target.value);
    };

    return (
        <form className={scss.form} onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Enter Notebook name..."
                onChange={handleChange}
                value={notebookName}
            />
            <button type="submit">Create Notebook</button>
        </form>
    );
};

const CreateModal = () => {
    return <Modal header={<Header />} body={<Body />} />;
};

export default CreateModal;
