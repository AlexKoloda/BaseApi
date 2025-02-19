import { bookRepository } from '../repository/book-repository';
import { cartRepository } from '../repository/cart-repository';
import bookService from './book-service';
import userService from './user-service';

class CartService {
  async addBookInCart(userId, bookId) {
    const user = await userService.getUser(userId);
    const book = await bookService.getBook(bookId);

    const bookInCart = await this.getBook(userId, bookId);

    if (bookInCart) {
      await cartRepository.update(bookInCart.id, {
        quantity: bookInCart.quantity + 1,
      });
      if (book.numberBooksStock > 0) {
        await bookRepository.update(bookId, {
          numberBooksStock: book.numberBooksStock - bookInCart.quantity,
        });
      }
      return this.getBooks(userId);
    } else {
      cartRepository.save({
        user: userId,
        books: bookId,
      });

      return this.getBooks(userId);
    }
  }

  async removeOneBook(userId, bookId) {
    const user = await userService.getUser(userId);
    const book = await bookService.getBook(bookId);

    const bookInCart = await this.getBook(userId, bookId);

    if (bookInCart) {
      await cartRepository.update(bookInCart.id, {
        quantity: bookInCart.quantity - 1,
      });
      await bookRepository.update(bookId, {
        numberBooksStock: book.numberBooksStock + bookInCart.quantity,
      });
      return this.getBooks(userId);
    }

     cartRepository.save({
      user: user,
      books: bookId,
    });
    return this.getBooks(userId);
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
   cartRepository.delete({
      user: {
        id: userId,
      },
      id: cartItemId,
    });

    return this.getBooks(userId);
  }

  getBook(userId, bookId) {
    return cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        books: {
          id: bookId,
        },
      },
    });
  }
}

export default new CartService();
