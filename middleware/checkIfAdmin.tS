import { RequestHandler } from 'express';

export const adminValidation: RequestHandler = (req, res, next) => {
  const { username } = req.body;
  if (username === 'Admin') {
    const { adminRequestedUsername } = req.body;
    req.body.username = adminRequestedUsername;
  }
  next();
  return;
};
export default adminValidation;
