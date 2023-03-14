import React, { FormEvent, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import Modal from "../../layouts/Modal/Modal";
import ModalHeader from "../../layouts/ModalHeader/ModalHeader";
import ModalNameActionForm from "../../layouts/ModalNameActionForm/ModalNameActionForm";
import { Notebook } from "../../models/Notebook";

const CreateModal = () => {
    const [notebookName, setNotebookName] = useState("");
    const { createNotebook } = useNotebookContext();
    const { closeModal } = useModalContext()!;

    const title = "Notebook";

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
        <Modal
            header={<ModalHeader title={title} />}
            body={
                <ModalNameActionForm
                    onChange={handleChange}
                    value={notebookName}
                    onSubmit={submitHandler}
                    actionType={"Create"}
                    title={title}
                />
            }
        />
    );
};

export default CreateModal;
