import React, { FC, useState, FormEvent } from "react";
import { useNotebookContext } from "../../contexts/notebookCtx";
import Modal from "../../layouts/Modal/Modal";
import { Notebook } from "../../models/Notebook";

interface UpdateNotebookProps {
    notebook: Notebook;
}

interface BodyProps extends UpdateNotebookProps {}

const Header = () => {
    return <h2>Update Notebook</h2>;
};

const Body: FC<BodyProps> = ({ notebook }) => {
    const [notebookName, setNotebookName] = useState(notebook.name);
    const { updateNotebook } = useNotebookContext();

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        console.log("New Notebook name: ", notebookName);
        updateNotebook(notebook.id, notebookName);
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                value={notebookName}
                onChange={(e) => setNotebookName(e.target.value)}
            />
            <button type="submit">Update Notebook</button>
        </form>
    );
};

const UpdateNotebook: FC<UpdateNotebookProps> = ({ notebook }) => {
    return <Modal header={<Header />} body={<Body notebook={notebook} />} />;
};

export default UpdateNotebook;
