import { userRepository } from '../repository/user-repository';
import { CreateUserType, UserInterface } from '../types/types';

class UserService {
  createUser(user: CreateUserType) {
    return userRepository.save(user);
  }

  getUsers(): Promise<UserInterface[]> {
    return userRepository.find();
  }

  getUser(userId: number) {
    return userRepository.findOneBy({ id: userId });
  }

  getUserPassword(userId: number) { 
    return userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });
  }

  updateUser(user: UserInterface) {
    userRepository.update(user.id, user);
  }

  updateUserPassword(user: UserInterface) {
   userRepository.update(user.id, user);
  }

  deleteUser(userId: number) {
    userRepository.delete(userId);
  }

}

export default new UserService();
