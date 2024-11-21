import { User } from "../entity/User";

class UserService {

  async createUser(user) {
      const newUser = await User.create(user);
      return newUser;
  }

  async getUsers() {   
      const users = await User.find();
      return users;  
  }

  async getUser(userId) {

      if(!userId) {
        throw new Error("Не указан id");
      }
      const user = await User.findOneBy({id:userId});
      return user;
  }

  async updateUser(user) {

    if(!user._id) {
      throw new Error("Не указан id"); 
    }
    const updatedUser = await User.findOneByUpdate(user._id, user, {new: true}) //TODO Придумать реализацию редактирования 
    return updatedUser;
  }

  async deleteUser(userId) {   

      if(!userId) {
        throw new Error("Не указан id");
      }
      const user = await User.findByIdAndDelete(userId) //TODO Придумать реализацию удаления 
      return user;   
  }
}

export default new UserService();