import { NextFunction, Request, Response } from "express";
import authService from "../services/auth-service";
import createJwt from "../util/token";
import { isValid } from "../validation/yups";
import { BadParams, NotFound, NotValidDataError } from "../util/custom-errors";
import { generatePassword } from "../util/hash-password";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = await isValid(req.body);

      if (!valid) {
        throw new BadParams("User data not valid");
      }
      req.body.password = generatePassword(req.body.password);
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
      const hashPassword = generatePassword(req.body.password);

      if (hashPassword !== user.password) {
        throw new BadParams("Wrong password");
      }
      if (!user) {
        throw new NotFound("Not found user");
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
