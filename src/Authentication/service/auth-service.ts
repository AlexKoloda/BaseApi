import { CreateUserInterface } from "../../types/types";
import userService from "../../User/service/user-service";

class authService {
  async registration(user: CreateUserInterface) {
    try {
      return await userService.createUser(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new authService();
