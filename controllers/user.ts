import { WEBSITE_URL } from './../utils/data/variables';
import {
  emailForgotPasswordTemplate,
  emailVerificationTemplate,
} from './../utils/sendGridTemplate';
import { RequestHandler } from 'express';
import CustomError from '../errors/CustomError';
import User from '../models/User';
import {
  decodeEmailVarificationToken,
  decodeLoginCookieToken,
  generateEmailVarificationToken,
  generateloginToken,
} from '../utils/jwt';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import serverResponse from '../utils/serverResponse';
import Joi from 'joi';
import userValidationScheme from '../utils/validation/userDependencies';
import { phoneNumberFormating } from '../utils/data/functions';
import { capitalizeOnlyFirstChars } from '../utils/data/functions';
const bcrypt = require('bcrypt');

const FIVE_MINUTES = new Date(Date.now() + 5 * 60 * 1000);
//האם אני צריך לבדוק לפני כל פונקציה את הטייפ של המשתנים שאני מקבל כדי שלא יכולו להקריס
dotenv.config();
sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);
export const sendforgotPasswordEmail: RequestHandler = async (
  req,
  res,
  next
) => {
  const { email } = req.body;
  const { email: emailDependencies } = userValidationScheme;
  const { error, value } = Joi.object({ emailDependencies }).validate({
    emailDependencies: email,
  });
  if (error) {
    return next(new CustomError(400, 'Not a valid email'));
  }
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return next(new CustomError(404, 'Email not registered'));
  }
  const { username, phoneNumber } = userExist;
  const userDetails = { username, email, phoneNumber };
  const forgotPasswordToken = generateEmailVarificationToken(userDetails);
  const emailMessage = emailForgotPasswordTemplate(email, forgotPasswordToken);
  await sgMail.send(emailMessage);
  return res.status(201).json(serverResponse('Email sent successfully'));
};
//לא קשור לטלפון להחזיר את היוזר לעמוד הראשי אחרי שינוי סיסמא מוצלח
export const changePassword: RequestHandler = async (req, res, next) => {
  const { token, newPassword } = req.body;
  if (!token || typeof token !== 'string') {
    return next(new CustomError(400, 'token is missing or sent inccorectly'));
  }
  const { password } = userValidationScheme;
  const { error, value } = Joi.object({ password }).validate({
    password: newPassword,
  });
  if (error) {
    return next(new CustomError(400, error.message));
  }
  const user = decodeEmailVarificationToken(token);
  if (!user) {
    return next(new CustomError(404, 'not valid token'));
  }
  const { username, email } = user;
  const userExist = await User.findOne({ email, username });
  if (!userExist) {
    return next(new CustomError(404, 'User not exist'));
  }
  const { password: oldPassword } = userExist;
  let isPasswordMatch = await bcrypt.compare(newPassword, oldPassword);
  if (isPasswordMatch === true) {
    return next(
      new CustomError(400, 'New password cant be the same as the old password')
    );
  }
  userExist.password = newPassword;
  await userExist.save();
  return res.status(201).json(serverResponse('Password changed!'));
};
export const emailVerification: RequestHandler = async (req, res, next) => {
  const { username, password, phoneNumber, email } = req.body;
  const formatedUsername = capitalizeOnlyFirstChars(username);
  const newUser = { username: formatedUsername, email, phoneNumber };
  const userExist = await User.findOne({
    $or: [{ formatedUsername }, { email }],
  });
  if (userExist) {
    if (userExist.username === newUser.username) {
      return next(new CustomError(400, 'Username already exists'));
    }
    if (userExist.email === newUser.email) {
      return next(new CustomError(400, 'Email already exists'));
    }
  }
  const user = new User({
    username: formatedUsername,
    password,
    email,
    phoneNumber,
  });
  await user.save();
  const registerToken = generateEmailVarificationToken(newUser);
  const emailMessage = emailVerificationTemplate(email, registerToken);
  await sgMail.send(emailMessage);
  return res
    .status(201)
    .json(serverResponse('verification email sent successfully'));
};
export const createUser: RequestHandler = async (req, res, next) => {
  const registerToken = req.query.token;
  if (!registerToken || typeof registerToken !== 'string') {
    return res.status(302).redirect(`${WEBSITE_URL}?message=Not a valid token`);
  }
  const newUser = decodeEmailVarificationToken(registerToken);
  if (!newUser) {
    return res.status(302).redirect(`${WEBSITE_URL}?message=Not a valid token`);
  }
  const { username, email } = newUser;
  try {
    const user = await User.findOneAndUpdate(
      { username, email },
      { isVerified: true }
    );
    if (!user) {
      return next(new CustomError(404, 'user not exist'));
    }
  } catch (err) {
    return res
      .status(302)
      .redirect(`${WEBSITE_URL}?message=Something went wrong`);
  }
  res.status(302).redirect(`${WEBSITE_URL}?message=Successfully Verified`);

  return res.redirect(WEBSITE_URL);
};

export const login: RequestHandler = async (req, res, next) => {
  const { password, email } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return next(new CustomError(401, 'unauthorized'));
  }
  if (!userExist.isVerified) {
    return next(new CustomError(401, 'not verified'));
  }
  const isPasswordMatch = await bcrypt.compare(password, userExist.password);
  if (isPasswordMatch === false) {
    return next(new CustomError(401, 'unauthorized'));
  }
  const formatedPhoneNumber = phoneNumberFormating(userExist.phoneNumber);
  const userFrontDetails = {
    username: userExist.username,
    email: userExist.email,
    phoneNumber: formatedPhoneNumber,
  };
  const loginToken = generateloginToken(
    userExist.username,
    userExist.email,
    userExist.phoneNumber
  );
  // res.cookie("login", loginToken, { expires: SEVEN_DAYS, httpOnly: true });
  return res
    .status(201)
    .json(
      serverResponse('Successfully logged in', { loginToken, userFrontDetails })
    );
};
export const checkLoginCookie: RequestHandler = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    return next(new CustomError(401, 'token missing'));
  }
  const { username, email, phoneNumber, exist } = decodeLoginCookieToken(token);
  if (!exist) {
    return next(new CustomError(401, 'unauthorized'));
  }
  const formatedPhoneNumber = phoneNumberFormating(phoneNumber);
  const user = { username, email, phoneNumber: formatedPhoneNumber };
  return res.status(200).json(serverResponse('User exist', user));
};
