import { userRepository } from "../repository/user-repository";
import { CreateUserInterface, GetUserInterface } from "../types/types";

class UserService {
  async createUser(user: CreateUserInterface) {
    const newUser = await userRepository.save(user);
    return newUser;
  }

  async getUsers(): Promise<GetUserInterface[]> {
    const users = await userRepository.find();
    return users;
  }

  async getUser(userId: number) {
    const user = await userRepository.findOneBy({ id: userId });
    return user;
  }

  async updateUser(user: GetUserInterface) {
    const updatedUser = await userRepository.update(user.id, user);
    return updatedUser;
  }

  async deleteUser(userId: number) {
    const user = await userRepository.delete(userId);
    return user;
  }
}

export default new UserService();
