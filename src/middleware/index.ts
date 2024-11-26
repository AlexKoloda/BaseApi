import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import { JwtPayload, verify } from "jsonwebtoken";
import userService from "../services/user-service";
import { CustomError, NotValidDataError } from "../util/custom-errors";
dotenv.config();

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
        throw new CustomError('Not authorization', 401);
    }
    const decoded = verify(token.split(" ")[1], process.env.TOKEN_SECRET);
    const user = await userService.getUser((decoded as JwtPayload).id);
     if (user) {
      next();
     } 
  } catch (err) {
    next(err);
  }
};

export default authenticateToken;
