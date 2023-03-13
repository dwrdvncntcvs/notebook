import React, { useState, ChangeEvent, FormEvent } from "react";
import { useModalContext } from "../../contexts/modalCtx";
import Modal from "../../layouts/Modal/Modal";
import ModalHeader from "../../layouts/ModalHeader/ModalHeader";
import ModalNameActionForm from "../../layouts/ModalNameActionForm/ModalNameActionForm";
import { PageUpdateProps } from "../../types/modalCtx";

const UpdatePage = () => {
    const { props } = useModalContext()!;
    const updateProps = props as PageUpdateProps;
    const [pageName, setPageName] = useState(updateProps.name);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPageName(e.target.value);
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        console.log("Page ID: ", updateProps.id);
        console.log("Page Name: ", pageName);
        console.log("Notebook ID: ", updateProps.notebookId);
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
