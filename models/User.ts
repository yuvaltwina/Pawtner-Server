import { Schema, model } from 'mongoose';
import { UserType } from '../utils/types';
import CustomError from '../errors/CustomError';
const bcrypt = require('bcrypt');

const HASH_PASS_ERROR_MSG = 'An error occured while hashing the password';
const USER_COLLECTION_NAME = 'users';

const UserSchema = new Schema<UserType>({
  username: {
    type: String,
    required: [true, 'Please provide name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  likedDogs: [{ type: Schema.Types.ObjectId, ref: 'Dog', default: [] }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expireAfterSeconds: 300,
      partialFilterExpression: { isVerified: false },
    },
  },
});

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err: any) {
    return next(new CustomError(500, HASH_PASS_ERROR_MSG));
  }
});

const User = model<UserType>('User', UserSchema, USER_COLLECTION_NAME);
export default User;
