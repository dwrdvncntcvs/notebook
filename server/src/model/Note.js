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
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
});

const Note = model("Note", NoteSchema);

module.exports = {
    Note,
};
