"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoute = void 0;
const express_1 = require("express");
const User_1 = require("./User");
const Dog_1 = require("./Dog");
const router = (0, express_1.Router)();
exports.MainRoute = router;
//להוסיף מידלוור של בדיקה האם יש יוזר (דרך הקוקי)
router.use('/user', User_1.usersRouter);
router.use('/dog', Dog_1.dogsRouter);
//# sourceMappingURL=MainRoute.js.map