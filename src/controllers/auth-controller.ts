import { NextFunction, Request, Response } from "express";
import authService from "../services/auth-service";
import createJwt from "../util/token";
import { BadParams, NotFound } from "../util/custom-errors";
import { generateHashPassword } from "../util/hash-password";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = generateHashPassword(req.body.password);
      const newUser = await authService.registration(req.body);
      const currentToken = createJwt(newUser.id);
      authService.excludePassword(newUser);
      res.status(201).json({ user: newUser, token: currentToken });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await authService.login(email);

      if (!user) {
        throw new NotFound("Not found user");
      }

      const hashPassword = generateHashPassword(req.body.password);

      if (hashPassword !== user.password) {
        throw new BadParams("Wrong password");
      }

      const currentToken = createJwt(user.id);
      authService.excludePassword(user);
      res.status(200).json({ user: user, token: currentToken });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
