import { Request, Response } from "express";
import userService from "../service/user-service";

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userService.getUser(Number(id));
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await userService.updateUser(req.body);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedUser = await userService.deleteUser(Number(id));
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

export default new UserController();
