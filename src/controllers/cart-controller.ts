import { Request, Response, NextFunction } from 'express';
import cartService from '../services/cart-service';
import { NotFound } from '../util/custom-errors';

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

  async removeOneBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = req.body.id;
      const userId = req.user.id;
      const cart = await cartService.removeOneBook(userId, bookId);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const cart = await cartService.getBooks(userId);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  async removeBook(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new NotFound('User not found');
      }
      const cartItemId = req.query.id;
      const userId = req.user.id;
      const cart = await cartService.removeBook(cartItemId, userId);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }
}

export default new CartController();
