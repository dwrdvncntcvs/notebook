const { isValidObjectId } = require("mongoose");
const { isNotebookExist } = require("../model/Notebook");
const { errorHandler, formatData } = require("../model/utils");

class DataService {
    _dataModel;
    name;

    constructor(name, dataModel) {
        this._dataModel = dataModel;
        this.name = name;
    }

    // Data values
    // Page Details
    // Parameter 1: { page: number, limit: number }
    // Page Filter
    // Parameter 2: { notebookId }
    async findAll(data, filter) {
        let filterId;

        if (filter?.hasOwnProperty("notebookId")) {
            if (!this.isValidId(filter.notebookId))
                return new Error("Notebook doesn't exist");

            if (!(await isNotebookExist(filter.notebookId)))
                return new Error("Notebook doesn't exist");

            filterId = filter.notebookId;
        }

        const currentPage = (data.page - 1) * data.limit;

        try {
            const dataResults = await this._dataModel
                .find(filter)
                .skip(data.currentPage)
                .limit(data.limit);

            const totalDataCount = await this._dataModel.count();
            const totalPages = Math.ceil(totalDataCount / data.limit);

            const pageMeta = {
                page: currentPage,
                count: totalDataCount,
                totalPages,
            };

            const dataObj = {
                [`${this.name}s`]: dataResults.map((p) => formatData(p)),
                [`${this.name}Meta`]: pageMeta,
            };

            if (this.name !== "notebook") {
                dataObj[`id`] = filterId;
            }

            return dataObj;
        } catch (err) {
            return errorHandler(err);
        }
    }

    // Data Values
    // { name: string, notebookId?: string, pageId?: string }
    async create(data) {
        if (data.hasOwnProperty("notebookId")) {
            if (!this.isValidId(data.notebookId))
                return new Error("Notebook doesn't exist");

            if (!(await isNotebookExist(data.notebookId)))
                return new Error("Notebook doesn't exist");
        }

        if (data.hasOwnProperty("pageId")) {
            if (!this.isValidId(data.pageId))
                return new Error("Page doesn't exist");
        }

        try {
            const createdData = await this._dataModel.create(data);
            return createdData;
        } catch (err) {
            return errorHandler(err);
        }
    }

    isValidId(id) {
        return isValidObjectId(id);
    }
}

module.exports = { DataService };
