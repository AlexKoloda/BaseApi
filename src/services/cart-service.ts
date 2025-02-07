import { Book } from '../db/entities/Book';
import User from '../db/entities/User';
import { cartRepository } from '../repository/cart-repository';

class CartService {
  addBookInCart(userId, bookId) {

  return cartRepository.save({ 
    user: userId,
    book: bookId,
  })
  
  }
}

export default new CartService();