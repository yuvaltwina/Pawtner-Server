import Joi from "joi";
import { UserType } from "../types";
import { RequestHandler } from "express";
import userValidationScheme from "./userDependencies";
import CustomError from "../../errors/CustomError";

export const newUserValidation: RequestHandler = (req, res, next) => {
  const user = req.body;
  const { password, email, username } = userValidationScheme;
  const { error, value } = Joi.object({ password, email, username }).validate(
    user
  );
  if (error) {
    return next(new CustomError(400, error.message));
  } else {
    next();
    return;
  }
};
export default newUserValidation;
