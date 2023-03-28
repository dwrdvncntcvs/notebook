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

    get uppercaseName() {
        return `${this.name.charAt(0).toUpperCase()}${this.name.slice(
            1,
            this.name.length
        )}`;
    }

    // Data values
    // Page Details
    // Parameter 1: { page: number, limit: number }
    // Page Filter
    // Parameter 2: { notebookId } || { pageId }
    async findAll(data, filter) {
        let filterId;

        if (filter?.hasOwnProperty("notebookId")) {
            if (!this.isValidId(filter.notebookId))
                return new Error("Page doesn't exist");

            if (!(await isNotebookExist(filter.notebookId)))
                return new Error("Page doesn't exist");

            filterId = filter.notebookId;
        }

        if (filter?.hasOwnProperty("pageId")) {
            if (!this.isValidId(filter.pageId)) {
                return new Error("Note doesn't exist");
            }

            filterId = filter.pageId;
        }

        const currentPage = (data.page - 1) * data.limit;

        try {
            const dataResults = await this._dataModel
                .find(filter)
                .skip(currentPage)
                .limit(data.limit);

            const totalDataCount = await this._dataModel.count();
            const totalPages = Math.ceil(totalDataCount / data.limit);

            const pageMeta = {
                page: data.page,
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
            return formatData(createdData);
        } catch (err) {
            return errorHandler(err);
        }
    }

    // This will update the data from the mongodb database
    // ID: should be the specific id of the data saved in the database
    // DATA: it is an object of data that you want to update on the database
    // This will replace the existing value saved in the database
    // To know the properties of this object please rely on the models created
    async update(id, data) {
        const dataToUpdate = {
            ...data,
            updatedAt: new Date(),
        };

        if (!this.isValidId(id))
            return new Error(`${this.uppercaseName} doesn't exist`);

        try {
            const data = await this.findData(id);

            if (!data) return new Error(`${this.uppercaseName} doesn't exist`);

            await this._dataModel.updateOne({ _id: id }, dataToUpdate, {
                runValidators: true,
            });

            const updatedData = await this.findData(id);

            return formatData(updatedData);
        } catch (err) {
            return errorHandler(err);
        }
    }

    async delete(id) {
        if (!this.isValidId(id))
            return new Error(`${this.uppercaseName} doesn't exist`);

        try {
            const data = await this.findData(id);

            if (!data) return new Error(`${this.uppercaseName} doesn't exist`);

            await this._dataModel.deleteOne({ _id: id });
            return {
                deleted: true,
                message: `${this.uppercaseName} was deleted successfully`,
            };
        } catch (err) {
            errorHandler(err);
        }
    }

    async findData(id) {
        const data = await this._dataModel.findOne({ _id: id });
        return data;
    }

    isValidId(id) {
        return isValidObjectId(id);
    }
}

module.exports = { DataService };
