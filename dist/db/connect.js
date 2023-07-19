"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        dbName: 'Pawtner',
        useUnifiedTopology: true,
    });
};
exports.default = connectDB;
//# sourceMappingURL=connect.js.map