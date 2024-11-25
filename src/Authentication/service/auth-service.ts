import { CreateUserInterface } from "../../types/types";
import { userRepository } from "../../User/repository/user-repository";
import userService from "../../User/service/user-service";

class authService {
  async registration(user: CreateUserInterface) {
    try {
      return await userService.createUser(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email: string, password: string) {
    try {
      const currentUser = await userRepository.findOneBy({ email, password });
      if (!currentUser) {
        throw "Пользователь не найден";
      }
      return currentUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new authService();
