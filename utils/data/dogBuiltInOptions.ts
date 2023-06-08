import { capitalizeOnlyFirstChars } from './functions';
import { cities } from './cities';
import { allBreedsArray } from './dogBreeds';
const citiesArrayContainDuplicates = cities.map((city) =>
  capitalizeOnlyFirstChars(city.english_name).trim()
);
const citiesArray = [...new Set(citiesArrayContainDuplicates)];

export const dogBuiltInOptions = {
  breedValuesArray: allBreedsArray,
  genderValuesArray: ['Male', 'Female'],
  ageValuesArray: ['Puppy', 'Young', 'Adult', 'Senior'],
  sizeValuesArray: [
    'Small (0-25 lbs)',
    'Medium (26-60 lbs)',
    'Large (61-100 lbs)',
    'Extra Large (101 lbs or more)',
  ],
  cityValuesArray: citiesArray,
};
