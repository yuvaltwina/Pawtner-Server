import { capitalizeOnlyFirstChars } from './functions';
import { cities } from './cities';
const citiesArrayContainDuplicates = cities.map((city) =>
  capitalizeOnlyFirstChars(city.english_name).trim()
);
const citiesArray = [...new Set(citiesArrayContainDuplicates)];

export const dogBuiltInOptions = {
  breedValuesArray: [
    'Golden retriver',
    'Random dog breed 1',
    'Random dog breed 2',
    'Random dog breed 3',
  ],
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
