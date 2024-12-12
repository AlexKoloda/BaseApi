import { CreateUserType } from '../types/types';
import { userRepository } from '../repository/user-repository';
import userService from './user-service';

class authService {
  registration(user: CreateUserType) {
    return userService.createUser(user);
  }

  login(email: string) {
    return userRepository.findOne({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        password: true,
        email: true,
      },
    });
  }
}

export default new authService();
