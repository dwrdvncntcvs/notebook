const formatData = (dataObj) => {
    const data = dataObj.toJSON();
    data["id"] = data._id.toString();
    delete data._id;
    delete data.__v;

    return data;
};

const errorHandler = (err) => {
    if (err.name === "ValidationError") {
        let errors = [];

        for (let field in err.errors) {
            errors.push({
                field,
                message: err.errors[field].message,
            });
        }

        return new Error(JSON.stringify(errors));
    }
};

module.exports = {
    formatData,
    errorHandler,
};
