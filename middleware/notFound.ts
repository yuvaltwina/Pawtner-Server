import { Request, Response } from 'express';
import CustomError from '../errors/CustomError';

const notFound = (req: Request, res: Response) => {
  console.log(1);
  return res.redirect(`https://pawtner-front.vercel.app/`);

  // throw new CustomError(404, "Route does not exist");
};
export default notFound;
