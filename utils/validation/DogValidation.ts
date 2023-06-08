import Joi from 'joi';
import { UserType } from '../types';
import { RequestHandler } from 'express';
import dogValidationScheme from './dogDependencies';
import CustomError from '../../errors/CustomError';

export const newDogValidation: RequestHandler = (req, res, next) => {
  const newDog = { ...req.body?.data };
  const {
    dogNameSchema,
    dogAboutSchema,
    dogBreedSchema,
    dogAgeSchema,
    dogCitySchema,
    dogSizeSchema,
    dogGenderSchema,
    dogImagesSchema,
  } = dogValidationScheme;

  const { error, value } = Joi.object({
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
    return next(new CustomError(400, error.message));
  } else {
    next();
    return;
  }
};
export const editDogValidation: RequestHandler = (req, res, next) => {
  const { name, about, breed, age, size, city, gender } = req.body?.data;
  const newDog = { name, about, breed, age, size, city, gender };

  const {
    dogNameSchema,
    dogAboutSchema,
    dogBreedSchema,
    dogAgeSchema,
    dogCitySchema,
    dogSizeSchema,
    dogGenderSchema,
  } = dogValidationScheme;

  const { error, value } = Joi.object({
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
    return next(new CustomError(400, error.message));
  } else {
    next();
    return;
  }
};
