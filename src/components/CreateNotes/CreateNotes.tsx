import React, { useState, ChangeEvent } from "react";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import scss from "./createNotes.module.scss";

const CreateNotes = () => {
    const [note, setNote] = useState("");

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    const submitHandler = () => {
        if (!note)
            toast.error("Can't submit without note", { position: "top-right" });

        console.log("Note: ", note);
        setNote("");
    };

    return (
        <section className={scss["create-notes"]}>
            <textarea
                name="note"
                id="note"
                placeholder="Enter notes here..."
                onChange={onChangeHandler}
                value={note}
            ></textarea>
            <button onClick={submitHandler}>
                <HiPlus /> Note
            </button>
        </section>
    );
};

export default CreateNotes;
