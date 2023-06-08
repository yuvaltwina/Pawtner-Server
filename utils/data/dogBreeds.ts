import axios from 'axios';
import CustomError from '../../errors/CustomError';

let allBreedsArray: string[] = [];
const getBreeds = async () => {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    allBreedsArray = response.data.map((dogData: any) => {
      return dogData.name;
    });
  } catch (err) {
    throw new CustomError(500, 'couldnt fetch breeds array');
  }
};
getBreeds();
export { allBreedsArray };
