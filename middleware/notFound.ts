import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    message: 'route not found',
  });
};
export default notFound;
