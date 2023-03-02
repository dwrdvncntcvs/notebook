import React, { FormEvent } from "react";
import Modal from "../../layouts/Modal/Modal";
import scss from "./createModal.module.scss";

const Header = () => {
    return (
        <div className={scss.header}>
            <h2>Notebook</h2>
        </div>
    );
};

const Body = () => {
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <form className={scss.form} onSubmit={submitHandler}>
            <input type="text" placeholder="Enter Notebook name..." />
            <button type="submit">Create Notebook</button>
        </form>
    );
};

const CreateModal = () => {
    return <Modal header={<Header />} body={<Body />} />;
};

export default CreateModal;
