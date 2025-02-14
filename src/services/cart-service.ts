import { cartRepository } from '../repository/cart-repository';
import userService from './user-service';

class CartService {
  async addBookInCart(userId, bookId) {
    const user = await userService.getUser(userId);
    const book = await cartRepository.findOne({
      where: {
        user: user,
        book: {
          id: bookId,
        },
      },
    });
    if (book) {
     book.quantity =+ 1;
    }

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
        },
      },
    });
  }

  async removeBook(cartItemId, userId) {
    return cartRepository.delete({
      user: {
        id: userId,
        cart: {
          id: cartItemId,
        },
      },
    });
  }
}

export default new CartService();
