const { Schema, model, isValidObjectId } = require("mongoose");
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
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

const Notebook = model("Notebook", NotebookSchema);

const create = async (notebookData) => {
    try {
        const createdNotebook = await Notebook.create(notebookData);
        return formatData(createdNotebook);
    } catch (err) {
        return errorHandler(err);
    }
};

const findAll = async (page = 1, limit = 10) => {
    const currentPage = (page - 1) * limit;
    try {
        const notebooksData = await Notebook.find()
            .skip(currentPage)
            .limit(limit);

        const totalNotebooks = await Notebook.count();
        const totalPages = Math.ceil(totalNotebooks / limit);

        const notebooksMeta = {
            page: currentPage,
            count: totalNotebooks,
            totalPages: totalPages,
        };

        const notebookObj = {
            notebooks: notebooksData.map((nb) => formatData(nb)),
            notebooksMeta,
        };

        return notebookObj;
    } catch (err) {
        return errorHandler(err);
    }
};

const update = async (notebookId, notebookData) => {
    const data = {
        ...notebookData,
        updatedAt: new Date(),
    };

    if (!isValidNotebookId(notebookId))
        return new Error("Notebook doesn't exist");

    try {
        const notebook = await Notebook.findOne({ _id: notebookId });

        if (!isNotebookExist(notebookId))
            return new Error("Notebook doesn't exist");

        await Notebook.updateOne({ _id: notebookId }, data, {
            runValidators: true,
        });

        return formatData(notebook);
    } catch (err) {
        return errorHandler(err);
    }
};

const remove = async (notebookId) => {
    if (isValidNotebookId(notebookId))
        return new Error("Notebook doesn't exist");

    try {
        const notebook = await Notebook.findOne({ _id: notebookId });

        if (isNotebookExist(notebookId)) {
            return new Error("Notebook doesn't exist");
        }

        await Notebook.deleteOne({ _id: notebookId });
        return {
            deleted: true,
            message: `"${notebook.name}" was deleted successfully`,
        };
    } catch (err) {
        return errorHandler(err);
    }
};

const isValidNotebookId = (notebookId) => isValidObjectId(notebookId);

const isNotebookExist = async (notebookId) =>
    (await Notebook.findOne({ _id: notebookId })) ? true : false;

module.exports = {
    Notebook,
    create,
    findAll,
    update,
    remove,
    isValidNotebookId,
    isNotebookExist,
};
