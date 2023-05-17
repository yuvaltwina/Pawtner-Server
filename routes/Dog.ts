import { newDogValidation } from './../utils/validation/newDogValidation';
import { createDog } from './../controllers/dog';
import {} from '../controllers/user';
import express from 'express';
import { RequestHandler } from 'express';

const router = express.Router();

const errorWrapper =
  (cb: any): RequestHandler =>
  (req, res, next) =>
    cb(req, res, next).catch(next);

router.post('/addDog', newDogValidation, errorWrapper(createDog));

//   router.get("/register", errorWrapper(createUser));

//   router.post("/login", errorWrapper(login));
//   router.get("/loginCookie", errorWrapper(checkLoginCookie));

//   router.post("/forgotPassword", errorWrapper(forgotPasswordEmail));
//   router.post("/changePassword", errorWrapper(changePassword));

export { router as dogsRouter };
