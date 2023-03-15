const formatData = (dataObj) => {
    const data = dataObj.toJSON();
    data["id"] = data._id.toString();
    delete data._id;
    delete data.__v;

    return data;
};

module.exports = {
    formatData,
};
