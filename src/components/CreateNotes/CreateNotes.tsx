import React, { useState, ChangeEvent } from "react";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import { useNoteContext } from "../../contexts/noteCtx";
import Note from "../../models/Note";
import scss from "./createNotes.module.scss";

const CreateNotes = () => {
    const [note, setNote] = useState("");
    const { createPageNote, pageId } = useNoteContext();

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    const submitHandler = () => {
        if (!note)
            toast.error("Can't submit without note", { position: "top-right" });

        const noteData = new Note(note, pageId);
        createPageNote(noteData);
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
