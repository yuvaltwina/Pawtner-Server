import { Request, Response } from 'express';
import CustomError from '../errors/CustomError';

const notFound = (req: Request, res: Response) => {
  return res.redirect(`https://pawtner-front.vercel.app/`);

  // throw new CustomError(404, "Route does not exist");
};
export default notFound;
