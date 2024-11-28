import { userRepository } from "../repository/user-repository";
import { CreateUserType, UserInterface } from "../types/types";

class UserService {
  async createUser(user: CreateUserType) {
    return await userRepository.save(user);     
  }

  async getUsers(): Promise<UserInterface[]> {
    return await userRepository.find();

  }

  async getUser(userId: number) {
    return await userRepository.findOneBy({ id: userId });
  }

  async updateUser(user: UserInterface) {
  await userRepository.update(user.id, user);  
  }

  async deleteUser(userId: number) {
  await userRepository.delete(userId);
  }
}

export default new UserService();
