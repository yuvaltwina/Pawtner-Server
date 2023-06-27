"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        dbName: 'Pawtner',
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    });
};
exports.default = connectDB;
// module.exports = connectDB;
//# sourceMappingURL=connect.js.map