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
  images: {
    type: [{ file: { type: Object }, url: { type: String } }],
    required: [true, 'Please provide images'],
  },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

const Dog = model<DogType>('Dog', DogSchema, DOG_COLLECTION_NAME);
export default Dog;
