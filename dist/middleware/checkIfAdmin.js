"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const adminValidation = (req, res, next) => {
    const { username } = req.body;
    if (username === 'Admin') {
        const { adminRequestedUsername } = req.body;
        req.body.username = adminRequestedUsername;
    }
    next();
    return;
};
exports.adminValidation = adminValidation;
exports.default = exports.adminValidation;
//# sourceMappingURL=checkIfAdmin.js.map