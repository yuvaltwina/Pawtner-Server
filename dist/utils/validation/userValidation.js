"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCookieValidtion = exports.newUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userDependencies_1 = __importDefault(require("./userDependencies"));
const CustomError_1 = __importDefault(require("../../errors/CustomError"));
const jwt_1 = require("../jwt");
const newUserValidation = (req, res, next) => {
    const user = req.body;
    const { password, email, username, phoneNumber } = userDependencies_1.default;
    const { error, value } = joi_1.default.object({
        password,
        email,
        username,
        phoneNumber,
    }).validate(user);
    if (error) {
        return next(new CustomError_1.default(400, error.message));
    }
    else {
        next();
        return;
    }
};
exports.newUserValidation = newUserValidation;
const userCookieValidtion = (req, res, next) => {
    const token = req.cookies.login;
    const { email, username, phoneNumber, exist } = (0, jwt_1.decodeLoginCookieToken)(token);
    console.log(`user exist on action  exist: ${exist}`);
    console.log(`user username on action   : ${username}`);
    if (!exist) {
        return next(new CustomError_1.default(401, 'unauthorized'));
    }
    req.body.username = username;
    req.body.email = email;
    req.body.phoneNumber = phoneNumber;
    next();
    return;
};
exports.userCookieValidtion = userCookieValidtion;
exports.default = exports.newUserValidation;
//# sourceMappingURL=userValidation.js.map