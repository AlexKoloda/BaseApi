import User from "../entity/User";
import userService from "../service/user-service";

// TODO Сделать типизацию req, res
/* interface reqType {
  firstName: string,
  lastName: string,
  email: string, 
  password: string,
  dateBirth: string,
}
 */

class UserController {
  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      return res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.body);
      return res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      return res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

export default new UserController();
