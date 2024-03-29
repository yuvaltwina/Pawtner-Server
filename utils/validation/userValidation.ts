import Joi from 'joi';
import { UserType } from '../types';
import { RequestHandler } from 'express';
import userValidationScheme from './userDependencies';
import CustomError from '../../errors/CustomError';
import { decodeLoginCookieToken } from '../jwt';

export const newUserValidation: RequestHandler = (req, res, next) => {
  const user = req.body;
  const { password, email, username, phoneNumber } = userValidationScheme;
  const { error, value } = Joi.object({
    password,
    email,
    username,
    phoneNumber,
  }).validate(user);
  if (error) {
    return next(new CustomError(400, error.message));
  } else {
    next();
    return;
  }
};

export const userCookieValidtion: RequestHandler = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    return next(new CustomError(401, 'token missing'));
  }
  const { email, username, phoneNumber, exist } = decodeLoginCookieToken(token);
  if (!exist) {
    return next(new CustomError(401, 'unauthorized'));
  }
  req.body.username = username;
  req.body.email = email;
  req.body.phoneNumber = phoneNumber;
  next();
  return;
};
export default newUserValidation;
