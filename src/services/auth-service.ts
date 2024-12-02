import { CreateUserType } from '../types/types';
import { userRepository } from '../repository/user-repository';
import userService from './user-service';

class authService {
  async registration(user: CreateUserType) {
    return await userService.createUser(user);
  }

  async login(email: string) {
    return await userRepository.findOne({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        password: true,
        email: true,
        dateBirth: true,
      },
    });
  }

  excludePassword = (user: CreateUserType) => {
    return delete user.password;
  };
}

export default new authService();
