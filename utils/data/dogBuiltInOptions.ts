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
  ageValuesArray: [
    'Puppy (0-1 years)',
    'Young (1-3 years)',
    'Adult (3-7 years)',
    'Senior (7+ years)',
  ],
  sizeValuesArray: [
    'Small (0-25 lbs)',
    'Medium (26-60 lbs)',
    'Large (61-100 lbs)',
    'Extra Large (101 lbs or more)',
  ],
  cityValuesArray: citiesArray,
};
