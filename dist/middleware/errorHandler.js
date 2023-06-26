"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    return response.status(status).json({
        status,
        message,
    });
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
//# sourceMappingURL=errorHandler.js.map