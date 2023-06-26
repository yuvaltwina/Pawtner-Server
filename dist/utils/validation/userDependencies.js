"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const username = joi_1.default.string()
    .pattern(/^[a-zA-Z][a-zA-Z0-9]{3,11}$/)
    .required()
    .messages({
    'string.base': 'Username should be a string',
    'string.empty': 'Username is required',
    'string.pattern.base': 'Username should start with a letter and contain only letters and numbers (4-12 characters)',
    'any.required': 'Username is required',
});
const password = joi_1.default.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password should be at least 8 characters',
    'any.required': 'Password is required',
    'string.pattern.base': 'Password must contain at least one letter and one number',
});
const email = joi_1.default.string().email().required().messages({
    'string.base': 'Email must be a valid string.',
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
});
const phoneNumber = joi_1.default.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
    'string.base': 'Phone number must be a valid string.',
    'string.pattern.base': 'Phone number must contain only numbers and be 10 b digits.',
    'any.required': 'Phone number is required.',
});
const userValidationScheme = {
    username,
    password,
    email,
    phoneNumber,
};
exports.default = userValidationScheme;
//# sourceMappingURL=userDependencies.js.map