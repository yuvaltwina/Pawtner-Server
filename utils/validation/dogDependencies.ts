import Joi from 'joi';
import { dogBuiltInOptions } from '../data/dogBuiltInOptions';
const {
  ageValuesArray,
  cityValuesArray,
  sizeValuesArray,
  breedValuesArray,
  genderValuesArray,
} = dogBuiltInOptions;
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
const NAME_REGEX = /^[a-zA-Z]{2,12}$/;
const ABOUT_REGEX = /^.{15,200}$/;
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/avif',
];

const name = Joi.string().pattern(NAME_REGEX).required().messages({
  'string.pattern.base':
    'The name must be between 2 and 12 characters and contain only letters.',
  'any.required': 'The name field is required.',
});
const about = Joi.string().pattern(ABOUT_REGEX).required().messages({
  'string.pattern.base':
    'The about field must be between 15 and 200 characters and contain only letters and numbers.',
  'any.required': 'The about field is required.',
});
const breed = Joi.string()
  .valid(...breedValuesArray)
  .required()
  .messages({
    'any.required': 'The breed field is required.',
    'any.only': `The breed must be one of the built in values`,
  });
const age = Joi.string()
  .valid(...ageValuesArray)
  .required()
  .messages({
    'any.required': 'The age field is required.',
    'any.only': `The age must be one of the built in values`,
  });
const size = Joi.string()
  .valid(...sizeValuesArray)
  .required()
  .messages({
    'any.required': 'The size field is required.',
    'any.only': `The size must be one of the built in values`,
  });
const city = Joi.string()
  .valid(...cityValuesArray)
  .required()
  .messages({
    'any.required': 'The city field is required.',
    'any.only': `The city must be one of the built in values`,
  });
const gender = Joi.string()
  .valid(...genderValuesArray)
  .required()
  .messages({
    'any.required': 'The gender field is required.',
    'any.only': `The gender must be one of the built in values`,
  });
const images = Joi.array()
  .items(
    Joi.object({
      file: Joi.object()
        .required()
        .custom((value, helpers) => {
          if (value.size > IMAGE_MAX_SIZE) {
            return helpers.error('any.maxSize');
          }
          if (!ALLOWED_IMAGE_TYPES.includes(value.type)) {
            return helpers.error('any.invalid');
          }
          return value;
        })
        .messages({
          'any.maxSize': 'File size must not exceed 5 megabyte.',
          'any.invalid':
            'Invalid file type. Only JPEG, JPG, PNG, and AVIF images are allowed.',
          'any.required': 'The file field is required.',
          'any.max': 'File size must not exceed 8 megabytes.',
        }),
      url: Joi.string().required(),
    })
  )
  .min(1)
  .max(3)
  .required()
  .messages({
    'array.min': 'At least 1 image is required.',
    'array.max': 'A maximum of 3 images is allowed.',
    'any.required': 'The images field is required.',
  });

const dogValidationScheme = {
  name,
  about,
  breed,
  age,
  size,
  city,
  gender,
  images,
};

export default dogValidationScheme;
