import CustomError from './errors/CustomError';
import { MainRoute } from './routes/MainRoute';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler';
import express from 'express';
import notFound from './middleware/notFound';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const connectDB = require('./db/connect');
//לפתור את הבעיה מהקונסול
// להוסיף את כל הדברי אבטחה מפרוייקטים קודמים
dotenv.config();

const uri = process.env.MONGO_URI;
const port = 3000;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.use('/', MainRoute);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    throw new CustomError();
  }
};
start();
