import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import userService from '../services/user-service';
import { UnAuthorized } from '../util/custom-errors';
import conf from '../config';


export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      next(new UnAuthorized('Not authorization'));
    }
    const decoded = verify(token.split(' ')[1], conf.token.secret);
    const user = await userService.getUser((decoded as JwtPayload).id);
    if (user) {
      req.user = user;
      next();
    }
  } catch (err) {
    next(new UnAuthorized('Not authorization'));
  }
};
