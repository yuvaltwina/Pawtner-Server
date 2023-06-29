"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDogValidation = exports.newDogValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const dogDependencies_1 = __importDefault(require("./dogDependencies"));
const CustomError_1 = __importDefault(require("../../errors/CustomError"));
const newDogValidation = (req, res, next) => {
    var _a;
    const newDog = Object.assign({}, (_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    const { dogNameSchema, dogAboutSchema, dogBreedSchema, dogAgeSchema, dogCitySchema, dogSizeSchema, dogGenderSchema, dogImagesSchema, } = dogDependencies_1.default;
    const { error, value } = joi_1.default.object({
        name: dogNameSchema,
        about: dogAboutSchema,
        breed: dogBreedSchema,
        age: dogAgeSchema,
        size: dogSizeSchema,
        city: dogCitySchema,
        gender: dogGenderSchema,
        images: dogImagesSchema,
    }).validate(newDog);
    if (error) {
        console.log(error.message);
        return next(new CustomError_1.default(400, error.message));
    }
    else {
        next();
        return;
    }
};
exports.newDogValidation = newDogValidation;
const editDogValidation = (req, res, next) => {
    var _a;
    const { name, about, breed, age, size, city, gender } = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data;
    const newDog = { name, about, breed, age, size, city, gender };
    const { dogNameSchema, dogAboutSchema, dogBreedSchema, dogAgeSchema, dogCitySchema, dogSizeSchema, dogGenderSchema, } = dogDependencies_1.default;
    const { error, value } = joi_1.default.object({
        name: dogNameSchema,
        about: dogAboutSchema,
        breed: dogBreedSchema,
        age: dogAgeSchema,
        size: dogSizeSchema,
        city: dogCitySchema,
        gender: dogGenderSchema,
    }).validate(newDog);
    if (error) {
        console.log(error.message);
        return next(new CustomError_1.default(400, error.message));
    }
    else {
        next();
        return;
    }
};
exports.editDogValidation = editDogValidation;
//# sourceMappingURL=DogValidation.js.map