"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = void 0;
const CustomError_1 = __importDefault(require("../../errors/CustomError"));
const cloudinary = require('cloudinary').v2;
const cloudName = process.env.CLOUD_NAME;
const cloudKey = process.env.CLOUD_KEY;
const cloudSecret = process.env.CLOUD_SECRET;
cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudKey,
    api_secret: cloudSecret,
});
const uploadImages = (base64Image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(base64Image, (err, result) => {
            if (err) {
                // Handle the error
                console.error(err);
                reject(new CustomError_1.default(500, 'Upload failed'));
            }
            else {
                // Access the uploaded image URL
                const imageUrl = result.secure_url;
                resolve(imageUrl);
                // Do something with the image URL (e.g., store it in a database)
                // ...
                // Send a response back to the client
            }
        });
    });
};
exports.uploadImages = uploadImages;
//# sourceMappingURL=functions.js.map