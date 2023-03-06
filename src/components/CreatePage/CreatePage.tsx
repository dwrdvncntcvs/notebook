import React, { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { usePageContext } from "../../contexts/pageCtx";
import Modal from "../../layouts/Modal/Modal";
import { Page } from "../../models/Page";
import scss from "./createPage.module.scss";

const Header = () => {
    return (
        <div className={scss.header}>
            <h2>Page</h2>
        </div>
    );
};

const Body = () => {
    const [pageName, setPageName] = useState("");
    const { createNotebookPage } = usePageContext();
    const { notebookId } = useNotebookContext();
    const { closeModal } = useModalContext()!;

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
        <form className={scss.form} onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Enter Page name..."
                onChange={handleChange}
                value={pageName}
            />
            <button type="submit">Create Page</button>
        </form>
    );
};

const CreatePage = () => {
    return <Modal header={<Header />} body={<Body />} />;
};

export default CreatePage;
