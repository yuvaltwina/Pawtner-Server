import dotenv from 'dotenv';
dotenv.config();

export const WEBSITE_URL = process.env.WEBSITE_URL as string;
export const SERVER_URL = process.env.SERVER_URL as string;
console.log(1);
console.log(WEBSITE_URL);
console.log(1);

// export const WEBSITE_URL = 'http://localhost:5173';
// export const SERVER_URL = 'http://localhost:3000';
