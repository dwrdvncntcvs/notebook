import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import Modal from "../../layouts/Modal/Modal";
import ModalHeader from "../../layouts/ModalHeader/ModalHeader";
import ModalNameActionForm from "../../layouts/ModalNameActionForm/ModalNameActionForm";
import { Notebook } from "../../models/Notebook";

interface UpdateNotebookProps {
    notebook: Notebook;
}

const UpdateNotebook: FC<UpdateNotebookProps> = ({ notebook }) => {
    const title = "Update Notebook";

    const [notebookName, setNotebookName] = useState(notebook.name);
    const { updateNotebook } = useNotebookContext();
    const { closeModal } = useModalContext()!;

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!notebookName) {
            toast.error("You cannot update the notebook with empty name");
            return;
        }
        updateNotebook(notebook.id, notebookName);
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
                    actionType="Update"
                    onChange={handleChange}
                    onSubmit={submitHandler}
                    title={title}
                    value={notebookName}
                />
            }
        />
    );
};

export default UpdateNotebook;
