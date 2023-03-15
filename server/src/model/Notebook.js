const { Schema, model } = require("mongoose");
const { formatData } = require("./utils");

const MIN_NAME = 5;
const MAX_NAME = 15;

const NotebookSchema = new Schema({
    name: {
        type: String,
        require: [true, "Notebook name should be provided"],
        min: [
            MIN_NAME,
            `Notebook name should be at least ${MIN_NAME} characters`,
        ],
        max: [
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

    const createdNotebook = await Notebook.create(data);
    return formatData(createdNotebook);
};

const findAll = async () => {
    const notebooksData = await Notebook.find();
    return notebooksData.map((nb) => formatData(nb));
};

const update = async (notebookId, notebookData) => {
    const data = {
        ...notebookData,
        updatedAt: new Date(),
    };

    await Notebook.updateOne({ _id: notebookId }, data);
    const notebook = await Notebook.findOne({ _id: notebookId });

    return formatData(notebook);
};

const remove = async (notebookId) => {
    const notebook = await Notebook.findOne({ _id: notebookId });
    await Notebook.deleteOne({ _id: notebookId });
    return {
        deleted: true,
        message: `"${notebook.name}" was deleted successfully`,
    };
};

module.exports = {
    Notebook,
    create,
    findAll,
    update,
    remove,
};
