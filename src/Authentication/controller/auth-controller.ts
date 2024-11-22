import { Request, Response } from "express";
import authService from "../service/auth-service";

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const newUser = await authService.registration(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new AuthController();
