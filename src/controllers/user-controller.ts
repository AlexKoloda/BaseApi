import { NextFunction, Request, Response } from 'express';
import userService from '../services/user-service';
import { NotFound } from '../util/custom-errors';

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
      if (!req.user) {
        throw new NotFound('User not found');
      }
      res.status(200).json(req.user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deletedUser = await userService.getUser(Number(id));
      if (!deletedUser) {
        throw new NotFound('User not found');
      }
      userService.deleteUser(Number(id));
      res.status(200).json('User delete');
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      userService.updateUser(req.body);
      const updatedUser = await userService.getUser(Number(id));
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
