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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide name"],
        // match: [
        //   /^[a-zA-Z][a-zA-Z0-9]{3,11}$/,
        //   "allows only letters and numbers in the string, and the first character must be a letter 4-12 charcters.",
        // ],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        // match: [
        //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        //   "Please provide a valid email",
        // ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        // match: [
        //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        //   "Atleast 8 characters , must one letter, must one number",
        // ],
    },
});
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
const User = mongoose.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map