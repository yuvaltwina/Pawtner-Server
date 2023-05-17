import { Schema, Types } from 'mongoose';

export interface UserType {
  username: string;
  email: string;
  password: string;
  likedDogs: Types.ObjectId[];
  isVerified: boolean;
  expireAt: Date;
}
export interface UserTokenType {
  username: string;
  email: string;
}
export interface DogType {
  name: string;
  breed: string;
  gender: string;
  age: string;
  size: string;
  about: string;
  city: string;
  images: { file: File; url: string }[];
  likedBy?: { user: UserType }[];
}
