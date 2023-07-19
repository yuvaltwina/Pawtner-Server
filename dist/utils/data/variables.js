"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_URL = exports.WEBSITE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.WEBSITE_URL = process.env.WEBSITE_URL;
exports.SERVER_URL = process.env.SERVER_URL;
// export const WEBSITE_URL = 'http://localhost:5173';
// export const SERVER_URL = 'http://localhost:3000';
//# sourceMappingURL=variables.js.map