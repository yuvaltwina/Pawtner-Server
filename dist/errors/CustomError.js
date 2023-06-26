"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(status = 500, message = "internal server error") {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map