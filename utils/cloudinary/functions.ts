import dotenv from 'dotenv';
import CustomError from '../../errors/CustomError';
const cloudinary = require('cloudinary').v2;
const cloudName = process.env.CLOUD_NAME;
const cloudKey = process.env.CLOUD_KEY;
const cloudSecret = process.env.CLOUD_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret,
});

export const uploadImages = (base64Image: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(base64Image, (err: any, result: any) => {
      if (err) {
        reject(new CustomError(500, 'Upload failed'));
      } else {
        const imageUrl: string = result.secure_url;
        resolve(imageUrl);
      }
    });
  });
};
