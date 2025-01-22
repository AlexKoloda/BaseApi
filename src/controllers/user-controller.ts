import { NextFunction, Request, Response } from 'express';
import userService from '../services/user-service';
import { NotFound } from '../util/custom-errors';
import { generateHashPassword } from '../util/hash-password';
import base64Decode from '../util/convert64Base';

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
    try {
      const { id } = req.params;
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
    try {
      const { id } = req.body;
      userService.updateUser(req.body);
      const updatedUser = await userService.getUser(Number(id));
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
 
  async updateUserPhoto(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      const { type } = req.body;
      const file = `${user.name}${Date.now()}.${type}`;
      const path = `src/public/${file}`;
      user.avatar = file;
      userService.updateUser(user);
      const updatedUser = await userService.getUser(user.id)
      await base64Decode(req.body.avatar, path);
      res.status(200).json(updatedUser.avatar);
    } catch (err) {
      next(err);
    }
  }

  async updateUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const user = await userService.getUser(id);
      const oldPassword = (await userService.getUserPassword(id)).password;
      const newHashPassword = generateHashPassword(req.body.newPassword);
      const oldHashPassword = generateHashPassword(req.body.oldPassword);

      if (oldHashPassword === oldPassword) {
        user.password = newHashPassword;
        userService.updateUserPassword(user);
      }
      res.status(200).json('Update successful');
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
