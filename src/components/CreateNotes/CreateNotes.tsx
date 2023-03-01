import React from "react";
import scss from "./createNotes.module.scss"

const CreateNotes = () => {
    return (
        <section className={scss['create-notes']}>
            <textarea
                name=""
                id=""
                placeholder="Enter notes here..."
            ></textarea>
            <button>Add</button>
        </section>
    );
};

export default CreateNotes;
