"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateloginToken = exports.decodeLoginCookieToken = exports.decodeEmailVarificationToken = exports.generateEmailVarificationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
function generateEmailVarificationToken(user) {
    const { username, email, phoneNumber } = user;
    const registerToken = jsonwebtoken_1.default.sign({ username, email, phoneNumber }, secret, {
        expiresIn: '5m',
    });
    return registerToken;
}
exports.generateEmailVarificationToken = generateEmailVarificationToken;
function decodeEmailVarificationToken(token) {
    let newUser;
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return newUser;
        }
        else {
            const { username, email, phoneNumber } = decoded;
            newUser = { username, email, phoneNumber };
        }
    });
    return newUser;
}
exports.decodeEmailVarificationToken = decodeEmailVarificationToken;
function decodeLoginCookieToken(token) {
    let userFrontDetails = {
        username: '',
        email: '',
        phoneNumber: '',
        exist: false,
    };
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return userFrontDetails;
        }
        else {
            const { username, email, phoneNumber } = decoded;
            userFrontDetails = { username, email, phoneNumber, exist: true };
        }
    });
    return userFrontDetails;
}
exports.decodeLoginCookieToken = decodeLoginCookieToken;
function generateloginToken(username, email, phoneNumber) {
    const registerToken = jsonwebtoken_1.default.sign({ username, email, phoneNumber }, secret, {
        expiresIn: '7d',
    });
    return registerToken;
}
exports.generateloginToken = generateloginToken;
// export function generateLoginToken(user: UserType) {
//   const { username, password, email } = user;
//   return jwt.sign(user, secret, { expiresIn: "7m" });
// }
//# sourceMappingURL=jwt.js.map