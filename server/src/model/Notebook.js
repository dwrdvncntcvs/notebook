const { Schema, model } = require("mongoose");
const { formatData, errorHandler } = require("./utils");

const MIN_NAME = 5;
const MAX_NAME = 15;

const NotebookSchema = new Schema({
    name: {
        type: String,
        required: [true, "Notebook name should be provided"],
        minlength: [
            MIN_NAME,
            `Notebook name should be at least ${MIN_NAME} characters`,
        ],
        maxlength: [
            MAX_NAME,
            `Notebook name should be no more than ${MAX_NAME} characters`,
        ],
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

const Notebook = model("Notebook", NotebookSchema);

const create = async (notebookData) => {
    const data = {
        ...notebookData,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    try {
        const createdNotebook = await Notebook.create(data);
        return formatData(createdNotebook);
    } catch (err) {
        return errorHandler(err);
    }
};

const findAll = async () => {
    try {
        const notebooksData = await Notebook.find();
        return notebooksData.map((nb) => formatData(nb));
    } catch (err) {
        return errorHandler(err);
    }
};

const update = async (notebookId, notebookData) => {
    const data = {
        ...notebookData,
        updatedAt: new Date(),
    };

    try {
        await Notebook.updateOne({ _id: notebookId }, data, {
            runValidators: true,
        });
        const notebook = await Notebook.findOne({ _id: notebookId });

        return formatData(notebook);
    } catch (err) {
        return errorHandler(err);
    }
};

const remove = async (notebookId) => {
    try {
        const notebook = await Notebook.findOne({ _id: notebookId });
        await Notebook.deleteOne({ _id: notebookId });
        return {
            deleted: true,
            message: `"${notebook.name}" was deleted successfully`,
        };
    } catch (err) {
        return errorHandler(err);
    }
};

module.exports = {
    Notebook,
    create,
    findAll,
    update,
    remove,
};
