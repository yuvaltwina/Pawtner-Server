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
const bcrypt = require('bcrypt');

const FIVE_MINUTES = new Date(Date.now() + 5 * 60 * 1000);

dotenv.config();
sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);

export const forgotPasswordEmail: RequestHandler = async (req, res, next) => {
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
  const { username } = userExist;
  const userDetails = { username, email };
  const forgotPasswordToken = generateEmailVarificationToken(userDetails);
  const emailMessage = emailForgotPasswordTemplate(email, forgotPasswordToken);
  await sgMail.send(emailMessage);
  return res.status(201).json(serverResponse('Email sent successfully'));
};

export const changePassword: RequestHandler = async (req, res, next) => {
  const { token, newPassword } = req.body;
  if (!token || typeof token !== 'string') {
    return res
      .status(201)
      .json(serverResponse('token is missing or sent inccorectly'));
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
  const { username, password, email } = req.body;
  const newUser = { username, email };
  const userExist = await User.findOne({
    $or: [{ username }, { email }],
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
    username,
    password,
    email,
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
    res.cookie('verified', 'Token is missing or sent incorectly', {
      expires: FIVE_MINUTES,
      // httpOnly: true,
    });
    return res.redirect(`http://localhost:5173`);
  }
  const newUser = decodeEmailVarificationToken(registerToken);
  if (!newUser) {
    res.cookie('verified', 'Not a valid token', {
      expires: FIVE_MINUTES,
      // httpOnly: true,
    });
    return res.redirect(`http://localhost:5173`);
  }
  const { username, email } = newUser;
  try {
    //אפשר להספים אותי בכך שילחצו במשך חמש דקות מלא פעמים על הקישור עם הטוקן?
    await User.findOneAndUpdate({ username, email }, { isVerified: true });
  } catch (err) {
    res.cookie('verified', 'Something went wrong', {
      expires: FIVE_MINUTES,
      // httpOnly: true,
    });
    return res.redirect(`http://localhost:5173`);
  }
  res.cookie('verified', 'Successfully verified', {
    expires: FIVE_MINUTES,
    // httpOnly: true,
  });
  return res.redirect(`http://localhost:5173`);
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
  const userFrontDetails = {
    username: userExist.username,
    email: userExist.email,
  };
  const loginToken = generateloginToken(userExist.username, userExist.email);
  // res.cookie("login", loginToken, { expires: SEVEN_DAYS, httpOnly: true });
  console.log('cookie created');
  return res
    .status(201)
    .json(
      serverResponse('Successfully logged in', { loginToken, userFrontDetails })
    );
};

export const checkLoginCookie: RequestHandler = async (req, res, next) => {
  const token = req.cookies.login;
  const { username, email, exist } = decodeLoginCookieToken(token);
  if (!exist) {
    return next(new CustomError(401, 'unauthorized'));
  }
  const user = { username, email };
  return res.status(200).json(serverResponse('User exist', user));
};
