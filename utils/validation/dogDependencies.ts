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
const NAME_REGEX = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z\s]{2,18}$/;
const ABOUT_REGEX = /^.{15,200}$/;
const ALLOWED_IMAGE_TYPES_REGEX = /^data:image\/(jpeg|jpg|png|avif);base64,/;

const dogNameSchema = Joi.string().pattern(NAME_REGEX).required().messages({
  'string.pattern.base':
    'The name must be between 2 and 18 characters and contain only letters.',
  'any.required': 'The name field is required.',
});
const dogAboutSchema = Joi.string().pattern(ABOUT_REGEX).required().messages({
  'string.pattern.base':
    'The about field must be between 15 and 200 characters and contain only letters and numbers.',
  'any.required': 'The about field is required.',
});
const dogBreedSchema = Joi.string()
  .valid(...breedValuesArray)
  .required()
  .messages({
    'any.required': 'The breed field is required.',
    'any.only': `The breed must be one of the built in values`,
  });
const dogAgeSchema = Joi.string()
  .valid(...ageValuesArray)
  .required()
  .messages({
    'any.required': 'The age field is required.',
    'any.only': `The age must be one of the built in values`,
  });
const dogSizeSchema = Joi.string()
  .valid(...sizeValuesArray)
  .required()
  .messages({
    'any.required': 'The size field is required.',
    'any.only': `The size must be one of the built in values`,
  });
const dogCitySchema = Joi.string()
  .valid(...cityValuesArray)
  .required()
  .messages({
    'any.required': 'The city field is required.',
    'any.only': `The city must be one of the built in values`,
  });
const dogGenderSchema = Joi.string()
  .valid(...genderValuesArray)
  .required()
  .messages({
    'any.required': 'The gender field is required.',
    'any.only': `The gender must be one of the built in values`,
  });
const dogImagesSchema = Joi.array()
  .items(
    Joi.object({
      base64String: Joi.string()
        .required()
        .regex(ALLOWED_IMAGE_TYPES_REGEX)
        .custom((value, helpers) => {
          const base64Data = value.replace(ALLOWED_IMAGE_TYPES_REGEX, '');
          const decodedData = Buffer.from(base64Data, 'base64');
          if (decodedData.length > IMAGE_MAX_SIZE) {
            return helpers.error('any.maxSize');
          }
          return value;
        })
        .messages({
          'any.maxSize': 'File size must not exceed 5 megabyte.',
          'string.pattern.base':
            'Invalid image format. Only JPEG, JPG, PNG, and AVIF images are allowed.',
          'any.required': 'The file field is required.',
        }),
      url: Joi.alternatives()
        .try(Joi.string().uri(), Joi.string().dataUri())
        .required()
        .messages({
          'any.required': 'The URL field is required.',
          'string.uri': 'Invalid URL format.',
          'string.dataUri': 'Invalid data URI format.',
        }),
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
  dogNameSchema,
  dogAboutSchema,
  dogBreedSchema,
  dogAgeSchema,
  dogSizeSchema,
  dogCitySchema,
  dogGenderSchema,
  dogImagesSchema,
};

export default dogValidationScheme;
