const mongoose = require("mongoose");

const mongoDbConnect = async (mongoDbUri) => {
    const uriPattern =
        /^(mongodb(?:\+srv)?:\/\/)?(?:([^:]+)(?::([^@]+))?@)?([^:/]+)(?::(\d+))?(?:\/([^?]+))?(?:\?(.*))?$/;

    if (!mongoDbUri) throw new Error("MongoDB URI cannot be empty");

    if (!uriPattern.test(mongoDbUri))
        throw new Error(`MongoDB URI "${mongoDbUri}" is note a valid URI`);

    mongoose.set({
        strictQuery: true,
    });

    await mongoose.connect(mongoDbUri);
    console.log(`Connected to ${mongoDbUri}`);
};

module.exports = {
    mongoDbConnect,
};
