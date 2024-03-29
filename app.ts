import CustomError from './errors/CustomError';
import { MainRoute } from './routes/MainRoute';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler';
import express from 'express';
import notFound from './middleware/notFound';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db/connect';
import { WEBSITE_URL } from './utils/data/variables';

dotenv.config();
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: WEBSITE_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/', MainRoute);
app.get('/', (req, res) => {
  return res.status(200).send('Home');
});
app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(uri as string);
    app.listen(port, () => {
      console.log(`Server listening at port: ${port}`);
    });
  } catch (error: any) {
    throw new CustomError(500, error?.message || 'Internal server error');
  }
};
start();
