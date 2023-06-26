"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    return res.status(404).json({
        message: 'route not found',
    });
};
exports.default = notFound;
//# sourceMappingURL=notFound.js.map