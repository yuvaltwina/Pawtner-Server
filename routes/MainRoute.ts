import { Router } from 'express';
import { usersRouter } from './User';
import { dogsRouter } from './Dog';
const router = Router();
//להוסיף מידלוור של בדיקה האם יש יוזר (דרך הקוקי)
router.use('/user', usersRouter);
router.use('/dog', dogsRouter);
export { router as MainRoute };
