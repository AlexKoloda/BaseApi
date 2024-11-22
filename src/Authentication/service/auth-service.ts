
import { CreateUserInterface } from "../../types/types";
import userService from "../../User/service/user-service";

class authService {
  async registration(user: CreateUserInterface) {
    userService.createUser(user);
  }
}

export default new authService();
