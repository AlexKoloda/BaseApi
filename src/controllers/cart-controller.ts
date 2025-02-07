import { Request, Response, NextFunction } from 'express';
import cartService from '../services/cart-service';


class CartController {

  async addBook(req: Request, res: Response, next: NextFunction) {
      try {
        const bookId = req.body.id;
        const userId = req.user.id;
        const cart = await cartService.addBookInCart(userId, bookId);     
        res.status(200).json(cart);
      } catch (err) {
        next(err);
      }
    }

}

export default new CartController();