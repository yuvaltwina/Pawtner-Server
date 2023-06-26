"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const bcrypt = require('bcrypt');
const HASH_PASS_ERROR_MSG = 'An error occured while hashing the password';
const USER_COLLECTION_NAME = 'users';
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide phone number'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    favoriteDogs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Dog', default: [] }],
    myDogs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Dog', default: [] }],
    isVerified: {
        type: Boolean,
        default: false,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {
            expireAfterSeconds: 300,
            partialFilterExpression: { isVerified: false },
        },
    },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt.genSalt(10);
            this.password = yield bcrypt.hash(this.password, salt);
        }
        catch (err) {
            return next(new CustomError_1.default(500, HASH_PASS_ERROR_MSG));
        }
    });
});
const User = (0, mongoose_1.model)('User', UserSchema, USER_COLLECTION_NAME);
exports.default = User;
//# sourceMappingURL=User.js.map