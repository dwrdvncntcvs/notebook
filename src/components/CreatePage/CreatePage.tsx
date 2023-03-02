import React, { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import Modal from "../../layouts/Modal/Modal";
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

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!pageName) {
            toast.error("Can't create a page with empty name");
            return;
        }

        setPageName("");
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
