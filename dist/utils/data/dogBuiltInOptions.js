"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dogBuiltInOptions = void 0;
const functions_1 = require("./functions");
const cities_1 = require("./cities");
const dogBreeds_1 = require("./dogBreeds");
const citiesArrayContainDuplicates = cities_1.cities.map((city) => (0, functions_1.capitalizeOnlyFirstChars)(city.english_name).trim());
const citiesArray = [...new Set(citiesArrayContainDuplicates)];
exports.dogBuiltInOptions = {
    breedValuesArray: dogBreeds_1.allBreedsArray,
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
//# sourceMappingURL=dogBuiltInOptions.js.map