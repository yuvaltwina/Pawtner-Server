import { Schema, model } from 'mongoose';
import { DogType } from '../utils/types';

const DOG_COLLECTION_NAME = 'dogs';

const DogSchema = new Schema<DogType>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  breed: {
    type: String,
    required: [true, 'Please provide breed'],
  },
  gender: {
    type: String,
    required: [true, 'Please provide gender'],
  },
  age: {
    type: String,
    required: [true, 'Please provide age'],
  },
  size: {
    type: String,
    required: [true, 'Please provide size'],
  },
  about: {
    type: String,
    required: [true, 'Please provide about'],
  },
  city: {
    type: String,
  },
  imagesUrl: {
    type: [String],
    required: [true, 'Please provide images'],
  },
  username: {
    type: String,
    required: [true, 'Please provide username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  likedBy: [{ type: String, ref: 'User', default: [] }],
});

const Dog = model<DogType>('Dog', DogSchema, DOG_COLLECTION_NAME);
export default Dog;
