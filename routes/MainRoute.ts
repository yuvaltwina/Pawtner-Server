import { Router } from 'express';
import { usersRouter } from './User';
import { dogsRouter } from './Dog';
import serverResponse from '../utils/serverResponse';

const router = Router();
router.use('/user', usersRouter);
router.use('/dog', dogsRouter);
router.use('/', () => {
  serverResponse('Home');
});
export { router as MainRoute };
