import CustomError from './errors/CustomError';
import { MainRoute } from './routes/MainRoute';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler';
import express from 'express';
import notFound from './middleware/notFound';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
// const connectDB = require('./db/connect');
// להוסיף את כל הדברי אבטחה מפרוייקטים קודמים
dotenv.config();

//הכנסתי את זה לפה ישירות במקום האימפורט
const mongoose = require('mongoose');
const connectDB = (url: string) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    dbName: 'Pawtner',
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
};

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.get('/home', (req, res) => {
  res.status(200).json({
    message: 'home route',
  });
});
app.use('/', MainRoute);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(uri as string);
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    throw new CustomError();
  }
};
start();
