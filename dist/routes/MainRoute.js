"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoute = void 0;
const express_1 = require("express");
const User_1 = require("./User");
const Dog_1 = require("./Dog");
const serverResponse_1 = __importDefault(require("../utils/serverResponse"));
const router = (0, express_1.Router)();
exports.MainRoute = router;
router.use('/user', User_1.usersRouter);
router.use('/dog', Dog_1.dogsRouter);
router.use('/', () => (0, serverResponse_1.default)('Home'));
//# sourceMappingURL=MainRoute.js.map