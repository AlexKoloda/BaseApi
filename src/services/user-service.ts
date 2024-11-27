import { userRepository } from "../repository/user-repository";
import { CreateUserInterface, GetUserInterface } from "../types/types";

class UserService {
  async createUser(user: CreateUserInterface) {
    return await userRepository.save(user);     
  }

  async getUsers(): Promise<GetUserInterface[]> {
    return await userRepository.find();

  }

  async getUser(userId: number) {
    return await userRepository.findOneBy({ id: userId });

  }

  async updateUser(user: GetUserInterface) {
    return await userRepository.update(user.id, user);
  
  }

  async deleteUser(userId: number) {
    return await userRepository.delete(userId);
 
  }
}

export default new UserService();
