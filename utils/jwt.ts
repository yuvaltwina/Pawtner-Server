import jwt from 'jsonwebtoken';
import { UserTokenType, UserType } from './types';
import dotenv from 'dotenv';
import CustomError from '../errors/CustomError';

export interface jwtType {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export interface loginCookieToken {
  username: string;
  email: string;
  phoneNumber: string;
  exist: boolean;
}

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export function generateEmailVarificationToken(user: UserTokenType) {
  const { username, email, phoneNumber } = user;
  const registerToken = jwt.sign(
    { username, email, phoneNumber },
    secret as string,
    {
      expiresIn: '5m',
    }
  );
  return registerToken;
}

export function decodeEmailVarificationToken(token: string) {
  let newUser: undefined | UserTokenType;
  jwt.verify(token, secret as string, (err, decoded) => {
    if (err) {
      return newUser;
    } else {
      const { username, email, phoneNumber } = decoded as jwtType;
      newUser = { username, email, phoneNumber };
    }
  });
  return newUser;
}

export function decodeLoginCookieToken(token: string): loginCookieToken {
  let userFrontDetails = {
    username: '',
    email: '',
    phoneNumber: '',
    exist: false,
  };
  jwt.verify(token, secret as string, (err, decoded) => {
    if (err) {
      return userFrontDetails;
    } else {
      const { username, email, phoneNumber } = decoded as jwtType;
      userFrontDetails = { username, email, phoneNumber, exist: true };
    }
  });
  return userFrontDetails;
}

export function generateloginToken(
  username: string,
  email: string,
  phoneNumber: string
) {
  const registerToken = jwt.sign(
    { username, email, phoneNumber },
    secret as string,
    {
      expiresIn: '7d',
    }
  );
  return registerToken;
}

// export function generateLoginToken(user: UserType) {
//   const { username, password, email } = user;

//   return jwt.sign(user, secret, { expiresIn: "7m" });
// }
