import React, { useState, ChangeEvent, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import { useNoteContext } from "../../contexts/noteCtx";
import { usePageContext } from "../../contexts/pageCtx";
import Note from "../../models/Note";
import scss from "./createNotes.module.scss";

const CreateNotes = () => {
    const { createPageNote, pageId, noteId, selectedNote, updateNote } =
        useNoteContext();
    const [note, setNote] = useState(selectedNote.note);
    const { pages } = usePageContext();

    useEffect(() => {
        setNote(selectedNote.note);
    }, [selectedNote.note]);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    const submitHandler = () => {
        if (!note) {
            toast.error("Can't submit without note", { position: "top-right" });
            return;
        }

        const noteData = new Note(note, pageId);
        createPageNote(noteData);
        setNote("");
    };

    const updateHandler = () => {
        const noteToUpdate = { ...selectedNote, note, updatedAt: new Date() };
        updateNote(noteToUpdate);
    };

    return (
        <section
            className={`${scss["create-notes"]} ${
                pages.length < 1 ? scss.hidden : ""
            }`}
        >
            <textarea
                name="note"
                id="note"
                placeholder="Enter notes here..."
                onChange={onChangeHandler}
                value={note}
            ></textarea>
            <button onClick={noteId ? updateHandler : submitHandler}>
                <HiPlus /> Note
            </button>
        </section>
    );
};

export default CreateNotes;
