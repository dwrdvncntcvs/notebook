import React, { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { usePageContext } from "../../contexts/pageCtx";
import Modal from "../../layouts/Modal/Modal";
import ModalHeader from "../../layouts/ModalHeader/ModalHeader";
import ModalNameActionForm from "../../layouts/ModalNameActionForm/ModalNameActionForm";
import { Page } from "../../models/Page";

const CreatePage = () => {
    const [pageName, setPageName] = useState("");
    const { createNotebookPage } = usePageContext();
    const { notebookId } = useNotebookContext();
    const { closeModal } = useModalContext()!;

    const title = "Page";

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!pageName) {
            toast.error("Can't create a page with empty name");
            return;
        }

        const page = new Page(pageName, notebookId);
        createNotebookPage(page);

        setPageName("");
        closeModal();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPageName(e.target.value);
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
                    value={pageName}
                />
            }
        />
    );
};

export default CreatePage;
