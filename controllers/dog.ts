import { uploadImages } from './../utils/cloudinary/functions';
import Dog from '../models/Dog';
import serverResponse from '../utils/serverResponse';
import { RequestHandler } from 'express';
import { DogFrontSentDataType, DogType, UserType } from '../utils/types';
import { capitalizeOnlyFirstChars } from '../utils/data/functions';
import CustomError from '../errors/CustomError';
import User from '../models/User';
const bcrypt = require('bcrypt');
//חשוב! לשנות בכולם שיקבלו יוזרניימ דרך הטוקן ולא סתם מהמשתמש
//האם אני צריך לבדוק לפני כל פונקציה את הטייפ של המשתנים שאני מקבל כדי שלא יכולו להקריס

export const createDog: RequestHandler = async (req, res, next) => {
  const { username, email, phoneNumber } = req.body;
  const {
    name,
    breed,
    gender,
    age,
    size,
    about,
    images,
    city,
  }: DogFrontSentDataType = req.body.data;
  const base64Images = images.map(
    (image: { base64String: string; url: string }) => {
      return image.base64String;
    }
  );
  const imagesUrl = await Promise.all(
    base64Images.map((base64image: string) => {
      const imageUrl = uploadImages(base64image);
      return imageUrl;
    })
  );
  const capitalName = capitalizeOnlyFirstChars(name);
  const newDog: DogType = {
    name: capitalName,
    breed,
    gender,
    age,
    size,
    about,
    city,
    username,
    email,
    imagesUrl,
    phoneNumber,
  };
  const dog = new Dog({
    ...newDog,
  });
  const user = await User.findOneAndUpdate(
    { email, username },
    { $addToSet: { myDogs: dog } }
  );
  if (!user) {
    return next(new CustomError(404, 'user not exist'));
  }
  await dog.save();
  return res.status(201).json(serverResponse('dog created successfully'));
};
//במחיקת כלב למחוק אותו מכל מי שעשה לו לייק דרך לייקד ביי
export const editDog: RequestHandler = async (req, res, next) => {
  const { name, breed, gender, age, size, about, city } = req.body?.data;
  const { _id } = req.body;

  const capitalName = capitalizeOnlyFirstChars(name);
  const updatedDog = {
    name: capitalName,
    breed,
    gender,
    age,
    size,
    about,
    city,
  };
  const dog = await Dog.findOneAndUpdate({ _id }, { ...updatedDog });
  if (!dog) {
    return next(new CustomError(404, 'dog not exist'));
  }
  return res.status(201).json(serverResponse('dog edited successfully'));
};

export const getUserDogsList: RequestHandler = async (req, res, next) => {
  const { username, email, phoneNumber } = req.body;
  const user = await User.findOne({ username }).populate('myDogs');
  if (!user) {
    return next(new CustomError(404, 'user not exist'));
  }
  const { myDogs } = user as UserType;
  return res
    .status(200)
    .json(serverResponse('sent successfully', { dogs: myDogs }));
};
export const deleteDog: RequestHandler = async (req, res, next) => {
  const { username, id } = req.body;
  let isAdmin = false;
  let adminRequestedUsername;

  //לבדוק אם זה דרך בסדר לאדמין
  if (username === 'Admin') {
    isAdmin = true;
    const { adminUsername } = req.body;
    adminRequestedUsername = adminUsername;
  }
  const user = await User.findOneAndUpdate(
    { username: isAdmin ? adminRequestedUsername : username },
    { $pull: { myDogs: id, favoriteDogs: id } },
    { new: true }
  );
  if (!user) {
    return next(new CustomError(404, 'user not exist'));
  }
  const dog = await Dog.findOneAndDelete({ _id: id });
  if (!dog) {
    return next(new CustomError(404, 'dog not exist'));
  }
  return res.status(200).json(serverResponse('deleted successfully'));
};

export const getAllDogs: RequestHandler = async (req, res, next) => {
  const allDogs = await Dog.find({});
  return res
    .status(200)
    .json(serverResponse('sent successfully', { dogs: allDogs }));
};

export const addDogToFavorties: RequestHandler = async (req, res, next) => {
  const { username, dogId } = req.body;
  const favoriteDog = await Dog.findOne({ _id: dogId });
  if (!favoriteDog) {
    return next(new CustomError(404, 'dog not exist'));
  }
  const user = await User.findOneAndUpdate(
    { username },
    { $addToSet: { favoriteDogs: favoriteDog } },
    { new: true }
  );
  if (!user) {
    return next(new CustomError(404, 'user not exist'));
  }
  await Dog.findOneAndUpdate(
    { _id: dogId },
    { $addToSet: { likedBy: username } }
  );
  return res.status(200).json(serverResponse('favorite added successfully'));
};

export const deleteDogFromFavorties: RequestHandler = async (
  req,
  res,
  next
) => {
  const { username, dogId } = req.body;
  const favoriteDog = await Dog.findOne({ _id: dogId });
  if (!favoriteDog) {
    return next(new CustomError(404, 'dog not exist'));
  }
  const user = await User.findOneAndUpdate(
    { username },
    { $pull: { favoriteDogs: favoriteDog._id } }
  );
  if (!user) {
    return next(new CustomError(404, 'user not exist'));
  }
  await Dog.findOneAndUpdate({ _id: dogId }, { $pull: { likedBy: username } });
  return res.status(200).json(serverResponse('favorite deleted successfully'));
};

export const getUserFavoriteDogs: RequestHandler = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username }).populate('favoriteDogs');
  if (!user) {
    return next(new CustomError(404, 'user not exist'));
  }
  const { favoriteDogs } = user as UserType;
  return res
    .status(200)
    .json(serverResponse('favorite dogs sent successfully', favoriteDogs));
};
