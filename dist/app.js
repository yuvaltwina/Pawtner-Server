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
const express_1 = __importDefault(require("express"));
const MainRoute_1 = require("./routes/MainRoute");
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB = require("./db/connect");
dotenv_1.default.config();
const uri = process.env.MONGO_URI;
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", MainRoute_1.MainRoute);
app.use((req, res) => res.status(404).json({ message: "Route not found" }));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(uri);
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=app.js.map