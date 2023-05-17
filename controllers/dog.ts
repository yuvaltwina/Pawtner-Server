import Dog from '../models/Dog';
import serverResponse from '../utils/serverResponse';
import { RequestHandler } from 'express';
import { DogType } from '../utils/types';
import { capitalizeOnlyFirstChars } from '../utils/data/functions';
const bcrypt = require('bcrypt');

// name: string;
// breed: string;
// gender: string;
// age: string;
// size: string;
// about: string;
// zipCode: string;
// images: { file: File; url: string }[];
// likedBy: { user: UserType }[];

export const createDog: RequestHandler = async (req, res, next) => {
  const { name, breed, gender, age, size, about, images, city } = req.body;
  const capitalName = capitalizeOnlyFirstChars(name);
  const newDog: DogType = {
    name: capitalName,
    breed,
    gender,
    age,
    size,
    about,
    city,
    images,
  };

  //validate all the data including zip code! and images!
  //take the city name from the zipCode and save the zip for location

  const dog = new Dog({
    ...newDog,
  });
  await dog.save();
  return res.status(201).json(serverResponse('dog created successfully'));
};
