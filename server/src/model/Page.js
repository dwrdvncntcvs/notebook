const { Schema, model, isValidObjectId } = require("mongoose");
const { isValidNotebookId, isNotebookExist } = require("./Notebook");
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
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const Page = model("Page", PageSchema);

const create = async ({ notebookId, name }) => {
    if (!isValidNotebookId(notebookId))
        return new Error("Can't create a page because notebook doesn't exist");

    try {
        if (!isNotebookExist(notebookId))
            return new Error(
                "Can't create a page because notebook doesn't exist"
            );

        const createdPage = await Page.create({ notebookId, name });
        return formatData(createdPage);
    } catch (err) {
        return errorHandler(err);
    }
};

const findAll = async (notebookId, page = 1, limit = 10) => {
    if (!isValidNotebookId(notebookId))
        return new Error("Can't get pages because notebook doesn't exist");

    const currentPage = (page - 1) * limit;
    try {
        if (!isNotebookExist(notebookId))
            return new Error("Can't get pages because notebook doesn't exist");

        const pageData = await Page.find({ notebookId })
            .skip(currentPage)
            .limit(limit);

        const totalPagesCount = await Page.count();
        const totalPages = Math.ceil(totalPagesCount / limit);

        const pageMeta = {
            page: currentPage,
            count: totalPagesCount,
            totalPages: totalPages,
        };

        const pageObj = {
            id: notebookId,
            pages: pageData.map((p) => formatData(p)),
            pageMeta,
        };

        return pageObj;
    } catch (err) {
        return errorHandler(err);
    }
};

const update = async (id, { name }) => {
    if (!isValidPageId(id)) return new Error("Page doesn't exist");

    try {
        if (!isPageExist) return new Error("Page doesn't exist");

        await Page.updateOne({ _id: id }, { name }, { runValidators: true });
        const updatedPage = await Page.findOne({ _id: id });

        return formatData(updatedPage);
    } catch (err) {
        return errorHandler(err);
    }
};

const remove = async (id) => {
    if (!isValidPageId(id)) return new Error("Page doesn't exist");

    try {
        if (!isPageExist) return new Error("Page doesn't exist");

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

const isValidPageId = (pageId) => isValidObjectId(pageId);

const isPageExist = async (pageId) =>
    (await Page.findOne({ _id: pageId })) ? true : false;

module.exports = {
    Page,
    create,
    findAll,
    update,
    remove,
};
