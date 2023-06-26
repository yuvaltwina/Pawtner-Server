import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    message: 'route not found',
  });
};
// throw new CustomError(404, "Route does not exist");
export default notFound;
