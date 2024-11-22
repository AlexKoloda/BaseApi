import { userRepository } from "../repository/user-repository";
import { CreateUserInterface, GetUserInterface } from "../types/types";

class UserService {
  async createUser(user: CreateUserInterface) {
    const newUser = await userRepository.create(user);
    return newUser;
  }

  async getUsers(): Promise<GetUserInterface[]> {
    const users = await userRepository.find();
    return users;
  }

  async getUser(userId: number) {
    if (!userId) {
      throw new Error("Не указан id");
    }
    const user = await userRepository.findOneBy({ id: userId });
    return user;
  }

  async updateUser(user: GetUserInterface) {
    if (!user.id) {
      throw new Error("Не указан id");
    }
    const updatedUser = await userRepository.update(user.id, user); //TODO Проверить реализацию редактирования
    return updatedUser;
  }

  async deleteUser(userId: number) {
    if (!userId) {
      throw new Error("Не указан id");
    }
    const user = await userRepository.delete(userId);
    return user;
  }
}

export default new UserService();
