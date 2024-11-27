import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";
import { BadParams, NotFound } from "../util/custom-errors";

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(Number(id));
      if (!user) {
        throw new NotFound("User not found");
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await userService.updateUser(req.body);
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deletedUser = await userService.deleteUser(Number(id));
      if (!deletedUser) {
        throw new NotFound("User not found");
      }
      res.status(200).json(deletedUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
