"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_URL = exports.WEBSITE_URL = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.WEBSITE_URL = process.env.WEBSITE_URL;
exports.SERVER_URL = process.env.SERVER_URL;
console.log(1);
console.log(exports.WEBSITE_URL);
console.log(1);
// export const WEBSITE_URL = 'http://localhost:5173';
// export const SERVER_URL = 'http://localhost:3000';
//# sourceMappingURL=variables.js.map