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
exports.getUserFavoriteDogs = exports.deleteDogFromFavorties = exports.addDogToFavorties = exports.getAllDogs = exports.deleteDog = exports.getUserDogsList = exports.editDog = exports.createDog = void 0;
const functions_1 = require("./../utils/cloudinary/functions");
const Dog_1 = __importDefault(require("../models/Dog"));
const serverResponse_1 = __importDefault(require("../utils/serverResponse"));
const functions_2 = require("../utils/data/functions");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const User_1 = __importDefault(require("../models/User"));
//האם אני צריך לבדוק לפני כל פונקציה את הטייפ של המשתנים שאני מקבל כדי שלא יכולו להקריס
const createDog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phoneNumber } = req.body;
    const { name, breed, gender, age, size, about, images, city, } = req.body.data;
    const base64Images = images.map((image) => {
        return image.base64String;
    });
    const imagesUrl = yield Promise.all(base64Images.map((base64image) => {
        const imageUrl = (0, functions_1.uploadImages)(base64image);
        return imageUrl;
    }));
    const capitalName = (0, functions_2.capitalizeOnlyFirstChars)(name);
    const newDog = {
        name: capitalName,
        breed,
        gender,
        age,
        size,
        about,
        city,
        username,
        email,
        imagesUrl,
        phoneNumber,
    };
    const dog = new Dog_1.default(Object.assign({}, newDog));
    const user = yield User_1.default.findOneAndUpdate({ email, username }, { $addToSet: { myDogs: dog } });
    if (!user) {
        return next(new CustomError_1.default(404, 'user not exist'));
    }
    yield dog.save();
    return res.status(201).json((0, serverResponse_1.default)('dog created successfully'));
});
exports.createDog = createDog;
const editDog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, breed, gender, age, size, about, city } = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data;
    const { _id } = req.body;
    const capitalName = (0, functions_2.capitalizeOnlyFirstChars)(name);
    const updatedDog = {
        name: capitalName,
        breed,
        gender,
        age,
        size,
        about,
        city,
    };
    const dog = yield Dog_1.default.findOneAndUpdate({ _id }, Object.assign({}, updatedDog));
    if (!dog) {
        return next(new CustomError_1.default(404, 'dog not exist'));
    }
    return res.status(201).json((0, serverResponse_1.default)('dog edited successfully'));
});
exports.editDog = editDog;
const getUserDogsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phoneNumber } = req.body;
    const user = yield User_1.default.findOne({ username }).populate('myDogs');
    if (!user) {
        return next(new CustomError_1.default(404, 'user not exist'));
    }
    const { myDogs } = user;
    return res
        .status(200)
        .json((0, serverResponse_1.default)('sent successfully', { dogs: myDogs }));
});
exports.getUserDogsList = getUserDogsList;
const deleteDog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, id } = req.body;
    let isAdmin = false;
    let adminRequestedUsername;
    //לבדוק אם זה דרך בסדר לאדמין
    if (username === 'Admin') {
        isAdmin = true;
        const { adminUsername } = req.body;
        adminRequestedUsername = adminUsername;
    }
    const user = yield User_1.default.findOneAndUpdate({ username: isAdmin ? adminRequestedUsername : username }, { $pull: { myDogs: id, favoriteDogs: id } }, { new: true });
    if (!user) {
        return next(new CustomError_1.default(404, 'user not exist'));
    }
    const dog = yield Dog_1.default.findOneAndDelete({ _id: id });
    if (!dog) {
        return next(new CustomError_1.default(404, 'dog not exist'));
    }
    return res.status(200).json((0, serverResponse_1.default)('deleted successfully'));
});
exports.deleteDog = deleteDog;
const getAllDogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allDogs = yield Dog_1.default.find({});
    return res
        .status(200)
        .json((0, serverResponse_1.default)('sent successfully', { dogs: allDogs }));
});
exports.getAllDogs = getAllDogs;
const addDogToFavorties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, dogId } = req.body;
    const favoriteDog = yield Dog_1.default.findOne({ _id: dogId });
    if (!favoriteDog) {
        return next(new CustomError_1.default(404, 'dog not exist'));
    }
    const user = yield User_1.default.findOneAndUpdate({ username }, { $addToSet: { favoriteDogs: favoriteDog } }, { new: true });
    if (!user) {
        return next(new CustomError_1.default(404, 'user not exist'));
    }
    yield Dog_1.default.findOneAndUpdate({ _id: dogId }, { $addToSet: { likedBy: username } });
    return res.status(200).json((0, serverResponse_1.default)('favorite added successfully'));
});
exports.addDogToFavorties = addDogToFavorties;
const deleteDogFromFavorties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, dogId } = req.body;
    const favoriteDog = yield Dog_1.default.findOne({ _id: dogId });
    if (!favoriteDog) {
        return next(new CustomError_1.default(404, 'dog not exist'));
    }
    const user = yield User_1.default.findOneAndUpdate({ username }, { $pull: { favoriteDogs: favoriteDog._id } });
    if (!user) {
        return next(new CustomError_1.default(404, 'user not exist'));
    }
    yield Dog_1.default.findOneAndUpdate({ _id: dogId }, { $pull: { likedBy: username } });
    return res.status(200).json((0, serverResponse_1.default)('favorite deleted successfully'));
});
exports.deleteDogFromFavorties = deleteDogFromFavorties;
const getUserFavoriteDogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield User_1.default.findOne({ username }).populate('favoriteDogs');
    if (!user) {
        return next(new CustomError_1.default(404, 'user not exist'));
    }
    const { favoriteDogs } = user;
    return res
        .status(200)
        .json((0, serverResponse_1.default)('favorite dogs sent successfully', favoriteDogs));
});
exports.getUserFavoriteDogs = getUserFavoriteDogs;
//# sourceMappingURL=dog.js.map