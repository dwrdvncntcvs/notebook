const { Schema, model } = require("mongoose");
const { errorHandler, formatData } = require("./utils");

const MIN_PAGE_NAME = 5;
const MAX_PAGE_NAME = 15;

const PageSchema = new Schema({
    name: {
        type: String,
        required: [true, "Page name should be provided"],
        minlength: [
            MIN_PAGE_NAME,
            `Page name should be at least ${MIN_PAGE_NAME} characters long`,
        ],
        maxlength: [
            MAX_PAGE_NAME,
            `Page name should be no more than ${MAX_PAGE_NAME} characters long`,
        ],
    },
    notebookId: {
        type: String,
        required: [true, "Notebook ID is required"],
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

const Page = model("Page", PageSchema);

const create = async ({ notebookId, name }) => {
    try {
        const createdPage = await Page.create({ notebookId, name });
        return formatData(createdPage);
    } catch (err) {
        return errorHandler(err);
    }
};

const findAll = async (page = 1, limit = 10) => {
    const currentPage = (page - 1) * limit;
    try {
        const pageData = await Page.find().skip(currentPage).limit(limit);

        const totalPagesCount = await Page.count();
        const totalPages = Math.ceil(totalNotebooks / limit);

        const pageMeta = {
            page: currentPage,
            count: totalPagesCount,
            totalPages: totalPages,
        };

        const notebookObj = {
            pages: pageData.map((p) => formatData(p)),
            pageMeta,
        };

        return notebookObj;
    } catch (err) {
        return errorHandler(err);
    }
};

const update = async (id, { name }) => {
    try {
        await Page.updateOne({ _id: id }, { name }, { runValidators: true });
        const updatedPage = await Page.findOne({ _id: id });

        return formatData(updatedPage);
    } catch (err) {
        return errorHandler(err);
    }
};

const remove = async (id) => {
    try {
        const page = await Page.findOne({ _id: id });
        await Page.deleteOne({ _id: id });

        return {
            deleted: true,
            message: `"${page.name}" was successfully deleted`,
        };
    } catch (err) {
        return errorHandler(err);
    }
};

module.exports = {
    Page,
    create,
    findAll,
    update,
    remove,
};
