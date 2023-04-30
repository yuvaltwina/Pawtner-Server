import {
  emailVerification,
  createUser,
  login,
  checkLoginCookie,
  // logout,
} from "../controllers/user";
import express from "express";
import newUserValidation from "../utils/validation/newUserValidation";
import { RequestHandler } from "express";

const router = express.Router();

const errorWrapper =
  (cb: any): RequestHandler =>
  (req, res, next) =>
    cb(req, res, next).catch(next);

router.post(
  "/verification",
  newUserValidation,
  errorWrapper(emailVerification)
);

router.get("/register", errorWrapper(createUser));

router.post("/login", errorWrapper(login));
router.get("/loginCookie", errorWrapper(checkLoginCookie));
// router.post("/logout", errorWrapper(logout));

export { router as usersRouter };
