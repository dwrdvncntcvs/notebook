import React, { useState, ChangeEvent, FormEvent } from "react";
import { useModalContext } from "../../contexts/modalCtx";
import { usePageContext } from "../../contexts/pageCtx";
import Modal from "../../layouts/Modal/Modal";
import ModalHeader from "../../layouts/ModalHeader/ModalHeader";
import ModalNameActionForm from "../../layouts/ModalNameActionForm/ModalNameActionForm";
import { PageUpdateProps } from "../../types/modalCtx";

const UpdatePage = () => {
    const { props, closeModal } = useModalContext()!;
    const { updateNotebookPage } = usePageContext();
    const updateProps = props as PageUpdateProps;
    const [pageName, setPageName] = useState(updateProps.name);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPageName(e.target.value);
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        const data = {
            ...updateProps,
            name: pageName,
        };

        updateNotebookPage(updateProps.notebookId, data);
        closeModal();
    };

    return (
        <Modal
            header={<ModalHeader title="Update Page" />}
            body={
                <ModalNameActionForm
                    actionType="Update"
                    onChange={handleChange}
                    onSubmit={submitHandler}
                    title="Page"
                    value={pageName}
                />
            }
        />
    );
};

export default UpdatePage;
