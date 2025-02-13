import { Tree } from 'typeorm';
import { Book } from '../db/entities/Book';
import User from '../db/entities/User';
import { cartRepository } from '../repository/cart-repository';
import userService from './user-service';

class CartService {
  async addBookInCart(userId, bookId) {
    return cartRepository.save({
      user: userId,
      book: bookId,
    });
  }

  async getBooks(id) {
    const user = await userService.getUser(id);

    return cartRepository.find({
      where: {
        user: user,
      },
      relations: {
        book: {
          author: true,
        }
      },
    });
  }

  async removeBook(cartItemId) {
    return cartRepository.delete(cartItemId);
  }
  
}

export default new CartService();
