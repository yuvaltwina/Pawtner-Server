"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const user_1 = require("../controllers/user");
const express_1 = __importDefault(require("express"));
const userValidation_1 = require("../utils/validation/userValidation");
const router = express_1.default.Router();
exports.usersRouter = router;
const errorWrapper = (cb) => (req, res, next) => cb(req, res, next).catch(next);
router.post('/verification', userValidation_1.newUserValidation, errorWrapper(user_1.emailVerification));
router.get('/register', errorWrapper(user_1.createUser));
router.post('/login', errorWrapper(user_1.login));
router.get('/loginCookie', errorWrapper(user_1.checkLoginCookie));
router.post('/forgotPassword', errorWrapper(user_1.sendforgotPasswordEmail));
router.post('/changePassword', errorWrapper(user_1.changePassword));
//# sourceMappingURL=User.js.map