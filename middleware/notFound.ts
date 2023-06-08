import { Request, Response } from 'express';
import CustomError from '../errors/CustomError';

const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    message: 'not-found',
  });
};
// throw new CustomError(404, "Route does not exist");
export default notFound;
