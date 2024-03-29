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
exports.checkLoginCookie = exports.login = exports.createUser = exports.emailVerification = exports.changePassword = exports.sendforgotPasswordEmail = void 0;
const variables_1 = require("./../utils/data/variables");
const sendGridTemplate_1 = require("./../utils/sendGridTemplate");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
const serverResponse_1 = __importDefault(require("../utils/serverResponse"));
const joi_1 = __importDefault(require("joi"));
const userDependencies_1 = __importDefault(require("../utils/validation/userDependencies"));
const functions_1 = require("../utils/data/functions");
const functions_2 = require("../utils/data/functions");
const bcrypt = require('bcrypt');
dotenv_1.default.config();
mail_1.default.setApiKey(process.env.SEND_GRID_API_KEY);
const sendforgotPasswordEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { email: emailDependencies } = userDependencies_1.default;
    const { error, value } = joi_1.default.object({ emailDependencies }).validate({
        emailDependencies: email,
    });
    if (error) {
        return next(new CustomError_1.default(400, 'Not a valid email'));
    }
    const userExist = yield User_1.default.findOne({ email });
    if (!userExist) {
        return next(new CustomError_1.default(404, 'Email not registered'));
    }
    const { username, phoneNumber } = userExist;
    const userDetails = { username, email, phoneNumber };
    const forgotPasswordToken = (0, jwt_1.generateEmailVarificationToken)(userDetails);
    const emailMessage = (0, sendGridTemplate_1.emailForgotPasswordTemplate)(email, forgotPasswordToken);
    yield mail_1.default.send(emailMessage);
    return res.status(201).json((0, serverResponse_1.default)('Email sent successfully'));
});
exports.sendforgotPasswordEmail = sendforgotPasswordEmail;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    if (!token || typeof token !== 'string') {
        return next(new CustomError_1.default(400, 'token is missing or sent inccorectly'));
    }
    const { password } = userDependencies_1.default;
    const { error, value } = joi_1.default.object({ password }).validate({
        password: newPassword,
    });
    if (error) {
        return next(new CustomError_1.default(400, error.message));
    }
    const user = (0, jwt_1.decodeEmailVarificationToken)(token);
    if (!user) {
        return next(new CustomError_1.default(404, 'not valid token'));
    }
    const { username, email } = user;
    const userExist = yield User_1.default.findOne({ email, username });
    if (!userExist) {
        return next(new CustomError_1.default(404, 'User not exist'));
    }
    const { password: oldPassword } = userExist;
    let isPasswordMatch = yield bcrypt.compare(newPassword, oldPassword);
    if (isPasswordMatch === true) {
        return next(new CustomError_1.default(400, 'New password cant be the same as the old password'));
    }
    userExist.password = newPassword;
    yield userExist.save();
    return res.status(201).json((0, serverResponse_1.default)('Password changed!'));
});
exports.changePassword = changePassword;
const emailVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, phoneNumber, email } = req.body;
    const formatedUsername = (0, functions_2.capitalizeOnlyFirstChars)(username);
    const newUser = { username: formatedUsername, email, phoneNumber };
    const userExist = yield User_1.default.findOne({
        $or: [{ formatedUsername }, { email }],
    });
    if (userExist) {
        if (userExist.username === newUser.username) {
            return next(new CustomError_1.default(400, 'Username already exists'));
        }
        if (userExist.email === newUser.email) {
            return next(new CustomError_1.default(400, 'Email already exists'));
        }
    }
    const user = new User_1.default({
        username: formatedUsername,
        password,
        email,
        phoneNumber,
    });
    yield user.save();
    const registerToken = (0, jwt_1.generateEmailVarificationToken)(newUser);
    const emailMessage = (0, sendGridTemplate_1.emailVerificationTemplate)(email, registerToken);
    yield mail_1.default.send(emailMessage);
    return res
        .status(201)
        .json((0, serverResponse_1.default)('verification email sent successfully'));
});
exports.emailVerification = emailVerification;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const registerToken = req.query.token;
    if (!registerToken || typeof registerToken !== 'string') {
        return res.status(302).redirect(`${variables_1.WEBSITE_URL}?message=Not a valid token`);
    }
    const newUser = (0, jwt_1.decodeEmailVarificationToken)(registerToken);
    if (!newUser) {
        return res.status(302).redirect(`${variables_1.WEBSITE_URL}?message=Not a valid token`);
    }
    const { username, email } = newUser;
    try {
        const user = yield User_1.default.findOneAndUpdate({ username, email }, { isVerified: true });
        if (!user) {
            return next(new CustomError_1.default(404, 'user not exist'));
        }
    }
    catch (err) {
        return res
            .status(302)
            .redirect(`${variables_1.WEBSITE_URL}?message=Something went wrong`);
    }
    res.status(302).redirect(`${variables_1.WEBSITE_URL}?message=Successfully Verified`);
    return res.redirect(variables_1.WEBSITE_URL);
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    const userExist = yield User_1.default.findOne({ email });
    if (!userExist) {
        return next(new CustomError_1.default(401, 'unauthorized'));
    }
    if (!userExist.isVerified) {
        return next(new CustomError_1.default(401, 'not verified'));
    }
    const isPasswordMatch = yield bcrypt.compare(password, userExist.password);
    if (isPasswordMatch === false) {
        return next(new CustomError_1.default(401, 'unauthorized'));
    }
    const formatedPhoneNumber = (0, functions_1.phoneNumberFormating)(userExist.phoneNumber);
    const userFrontDetails = {
        username: userExist.username,
        email: userExist.email,
        phoneNumber: formatedPhoneNumber,
    };
    const loginToken = (0, jwt_1.generateloginToken)(userExist.username, userExist.email, userExist.phoneNumber);
    return res
        .status(201)
        .json((0, serverResponse_1.default)('Successfully logged in', { loginToken, userFrontDetails }));
});
exports.login = login;
const checkLoginCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if (!token) {
        return next(new CustomError_1.default(401, 'token missing'));
    }
    const { username, email, phoneNumber, exist } = (0, jwt_1.decodeLoginCookieToken)(token);
    if (!exist) {
        return next(new CustomError_1.default(401, 'unauthorized'));
    }
    const formatedPhoneNumber = (0, functions_1.phoneNumberFormating)(phoneNumber);
    const user = { username, email, phoneNumber: formatedPhoneNumber };
    return res.status(200).json((0, serverResponse_1.default)('User exist', user));
});
exports.checkLoginCookie = checkLoginCookie;
//# sourceMappingURL=user.js.map