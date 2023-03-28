const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
    note: {
        type: String,
        required: [true, "Note must be provided"],
    },
    pageId: {
        type: String,
        required: [true, "Page ID is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

const Note = model("Note", NoteSchema);

module.exports = {
    Note,
};
