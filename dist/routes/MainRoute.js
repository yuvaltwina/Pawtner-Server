"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoute = void 0;
const express_1 = require("express");
const User_1 = require("./User");
const router = (0, express_1.Router)();
exports.MainRoute = router;
router.use("/user", User_1.usersRouter);
//# sourceMappingURL=MainRoute.js.map