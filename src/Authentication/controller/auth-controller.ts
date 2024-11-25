import { Request, Response } from "express";
import authService from "../service/auth-service";
import { sign } from "jsonwebtoken";

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const newUser = await authService.registration(req.body);
      const currentToken = this.createJwt(newUser.email);
      res
        .status(201)
        .json(newUser)
        .setHeader("Authorization", "Bearer" + currentToken);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      const currentToken = this.createJwt(email);
      res
        .status(200)
        .json(user)
        .setHeader("Authorization", "Bearer" + currentToken);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  private createJwt(email: string) {
    const token = sign({ email }, "secret", { expiresIn: "24h" });
  }
}

export default new AuthController();
