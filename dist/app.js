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
const CustomError_1 = __importDefault(require("./errors/CustomError"));
const MainRoute_1 = require("./routes/MainRoute");
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// const connectDB = require('./db/connect');
//לפתור את הבעיה מהקונסול
// להוסיף את כל הדברי אבטחה מפרוייקטים קודמים
dotenv_1.default.config();
const mongoose = require('mongoose');
const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        dbName: 'Pawtner',
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    });
};
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.get('/home', (req, res) => {
    res.status(200).json({
        message: 'home route',
    });
});
app.use('/', MainRoute_1.MainRoute);
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(uri);
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    }
    catch (error) {
        throw new CustomError_1.default();
    }
});
start();
//# sourceMappingURL=app.js.map