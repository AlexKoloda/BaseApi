import { Request, Response } from "express";
import authService from "../service/auth-service";
import createJwt from "../../util/token";
import { isValid } from "../../validation/yups";

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const valid = await isValid(req.body);

      if (!valid) {
        throw new Error("Не верные данные");
      }

      const newUser = await authService.registration(req.body);
      const currentToken = createJwt(newUser.email);
      res
        .status(201)
        .setHeader("authorization", "Bearer" + currentToken)
        .json(newUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      const currentToken = createJwt(email);
      res.status(200).json({ user: user, token: currentToken });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
}

export default new AuthController();
