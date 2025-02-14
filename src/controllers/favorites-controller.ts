import { Request, Response, NextFunction } from 'express';
import favoriteService from '../services/favorite-service';
import { NotFound } from '../util/custom-errors';

class FavoritesController {
  async addBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = req.body.id;
      const userId = req.user.id;
      favoriteService.addBook(userId, bookId);
      res.status(200).json('Book added in favorites');
    } catch (err) {
      if (err.code === "23505") {
        throw new NotFound('This book already save')
      }
      next(err);
    }
  }

  async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const cart = await favoriteService.getBooks(userId);
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
      const bookId = req.query.id;
      const userId = req.user.id;
      const favoritesBooks = await favoriteService.removeBook(bookId, userId);
      res.status(200).json(favoritesBooks);
    } catch (err) {
      next(err);
    }
  }
}

export default new FavoritesController();