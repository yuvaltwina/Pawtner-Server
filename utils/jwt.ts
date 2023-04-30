import jwt from "jsonwebtoken";
import { UserType } from "./types";
import dotenv from "dotenv";
import CustomError from "../errors/CustomError";

export interface jwtType {
  username: string;
  email: string;
  password: string;
}
export interface loginCookieToken {
  username: string;
  email: string;
  exist: boolean;
}

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export function generateEmailVarificationToken(user: UserType) {
  //חייב לשלוח את הסיסמה?
  const { username, password, email } = user;
  const registerToken = jwt.sign(
    { username, password, email },
    secret as string,
    {
      expiresIn: "5m",
    }
  );
  return registerToken;
}

export function decodeEmailVarificationToken(token: string) {
  let newUser: undefined | UserType;
  jwt.verify(token, secret as string, (err, decoded) => {
    if (err) {
      console.log("not valid token");
      return newUser;
    } else {
      const { username, password, email } = decoded as jwtType;
      newUser = { username, password, email };
    }
  });
  return newUser;
}

export function decodeLoginCookieToken(token: string): loginCookieToken {
  let userFrontDetails = { username: "", email: "", exist: false };
  jwt.verify(token, secret as string, (err, decoded) => {
    if (err) {
      return userFrontDetails;
    } else {
      console.log("valid");
      const { username, email } = decoded as jwtType;
      userFrontDetails = { username, email, exist: true };
    }
  });
  return userFrontDetails;
}

export function generateloginToken(username: string, email: string) {
  const registerToken = jwt.sign({ username, email }, secret as string, {
    expiresIn: "7d",
  });
  return registerToken;
}

// export function generateLoginToken(user: UserType) {
//   const { username, password, email } = user;

//   return jwt.sign(user, secret, { expiresIn: "7m" });
// }
