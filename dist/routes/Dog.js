"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dogsRouter = void 0;
const DogValidation_1 = require("../utils/validation/DogValidation");
const dog_1 = require("./../controllers/dog");
const express_1 = __importDefault(require("express"));
const userValidation_1 = require("../utils/validation/userValidation");
const checkIfAdmin_1 = require("../middleware/checkIfAdmin");
const router = express_1.default.Router();
exports.dogsRouter = router;
const errorWrapper = (cb) => (req, res, next) => cb(req, res, next).catch(next);
router.get('/getAllDogs', errorWrapper(dog_1.getAllDogs));
router.use(userValidation_1.userCookieValidtion);
router.use(checkIfAdmin_1.adminValidation);
router.post('/addDog', DogValidation_1.newDogValidation, errorWrapper(dog_1.createDog));
router.post('/editDog', DogValidation_1.editDogValidation, errorWrapper(dog_1.editDog));
router.post('/deleteDog', errorWrapper(dog_1.deleteDog));
router.get('/getMyDogs', errorWrapper(dog_1.getUserDogsList));
router.post('/deleteFavoriteDog', errorWrapper(dog_1.deleteDogFromFavorties));
router.post('/addFavoriteDog', errorWrapper(dog_1.addDogToFavorties));
router.get('/getFavoriteDogs', errorWrapper(dog_1.getUserFavoriteDogs));
//# sourceMappingURL=Dog.js.map