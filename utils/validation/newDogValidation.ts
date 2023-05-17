import Joi from 'joi';
import { UserType } from '../types';
import { RequestHandler } from 'express';
import dogValidationScheme from './dogDependencies';
import CustomError from '../../errors/CustomError';

export const newDogValidation: RequestHandler = (req, res, next) => {
  const newDog = { ...req.body?.data, images: req.body?.images };
  const { name, about, breed, age, size, city, gender, images } =
    dogValidationScheme;
  console.log(req.body?.images);
  const { error, value } = Joi.object({
    name,
    about,
    breed,
    age,
    size,
    city,
    gender,
    images,
  }).validate(newDog);
  if (error) {
    console.log(error.message);
    return next(new CustomError(400, error.message));
  } else {
    next();
    return;
  }
};
export default newDogValidation;
