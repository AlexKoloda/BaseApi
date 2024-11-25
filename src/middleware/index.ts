import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const jwt = require("jsonwebtoken");
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (token === null) {
    return res.status(401);
  }

  return jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res.status(403);
      }
      req.user = user;
      next();
    }
  );
};

export default authenticateToken;