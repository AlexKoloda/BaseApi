import { bookRepository } from '../repository/book-repository';
import { cartRepository } from '../repository/cart-repository';
import bookService from './book-service';
import userService from './user-service';

class CartService {
  async addBookInCart(userId, bookId) {
    const user = await userService.getUser(userId);
    const book = await bookService.getBook(bookId);
    const bookInCart = await cartRepository.findOne({
      where: {
        user: userId,
        books: bookId,
      },
    });

    if (bookInCart) {
      return cartRepository.update(bookInCart.id, {
        quantity: bookInCart.quantity + 1,
      });
    }

    const cart = await cartRepository.save({
      user: userId,
      books: bookId,
    });

    return cart;
  }

  async removeOneBook(userId, bookId) {
    const user = await userService.getUser(userId);
    const bookInCart = await cartRepository.findOne({
      where: {
        user: user,
        books: {
          id: bookId,
        },
      },
    });
    if (bookInCart) {
      return cartRepository.update(bookInCart.id, {
        quantity: bookInCart.quantity - 1,
      });
    }

    return cartRepository.save({
      user: user,
      books: bookId,
    });
  }

  async getBooks(id) {
    const user = await userService.getUser(id);

    return cartRepository.find({
      where: {
        user: user,
      },
      relations: {
        books: {
          author: true,
        },
      },
    });
  }

  async removeBook(cartItemId, userId) {
    console.log(cartItemId);
    return cartRepository.delete({
      user: {
        id: userId,
      },
      id: cartItemId,
    });
  }
}

export default new CartService();
