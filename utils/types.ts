import { Schema, Types } from 'mongoose';

export interface UserType {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  favoriteDogs: Types.ObjectId[];
  myDogs: Types.ObjectId[];
  isVerified: boolean;
  expireAt: Date;
}
export interface UserTokenType {
  username: string;
  email: string;
  phoneNumber: string;
}
export interface DogType {
  name: string;
  breed: string;
  gender: string;
  age: string;
  size: string;
  about: string;
  city: string;
  imagesUrl: string[];
  username: string;
  email: string;
  phoneNumber: string;
  likedBy?: { user: UserType }[];
}
export interface AllDogsType {
  allDogs: { user: DogType }[];
}
export interface DogFrontSentDataType {
  name: string;
  breed: string;
  gender: string;
  age: string;
  size: string;
  about: string;
  city: string;
  images: { base64String: string; url: string }[];
  likedBy?: { user: UserType }[];
}
