import {
  editDogValidation,
  newDogValidation,
} from '../utils/validation/DogValidation';
import {
  addDogToFavorties,
  createDog,
  deleteDog,
  deleteDogFromFavorties,
  editDog,
  getAllDogs,
  getUserDogsList,
  getUserFavoriteDogs,
} from './../controllers/dog';
import {} from '../controllers/user';
import express from 'express';
import { RequestHandler } from 'express';
import { userCookieValidtion } from '../utils/validation/userValidation';
import { adminValidation } from '../middleware/checkIfAdmin';
const router = express.Router();

const errorWrapper =
  (cb: any): RequestHandler =>
  (req, res, next) =>
    cb(req, res, next).catch(next);

router.get('/getAllDogs', errorWrapper(getAllDogs));

router.use(userCookieValidtion);
router.use(adminValidation);

router.post('/addDog', newDogValidation, errorWrapper(createDog));
router.post('/editDog', editDogValidation, errorWrapper(editDog));
router.post('/deleteDog', errorWrapper(deleteDog));
router.get('/getMyDogs', errorWrapper(getUserDogsList));

router.post('/deleteFavoriteDog', errorWrapper(deleteDogFromFavorties));
router.post('/addFavoriteDog', errorWrapper(addDogToFavorties));
router.get('/getFavoriteDogs', errorWrapper(getUserFavoriteDogs));
export { router as dogsRouter };
