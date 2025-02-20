import { NextFunction, query, Request, Response } from 'express';
import bookService from '../services/book-service';
import { NotFound } from '../util/custom-errors';

class BookController {
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const newBook = await bookService.createBook(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      next(err);
    }
  }

  async getAllBook(req: Request, res: Response, next: NextFunction) {
    try {
      const sort = req.query.sort || '1';
      const { search } = req.query;
      const { page } = req.query;
      const { genre } = req.query;
      const { price } = req.query;
      const allBook = await bookService.getBooks(
        page,
        genre,
        sort,
        price,
        search,
      );
      res.status(200).json(allBook);
    } catch (err) {
      next(err);
    }
  }

  async getBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      const book = await bookService.getBook(id);
      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }

  async getRecommendationBooks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { genreId } = req.query;
      const { bookId } = req.query;
      const data = await bookService.getRecBooks(String(genreId), String(bookId));
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async updateBookRating(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const bookId = req.body.id;
      const { value } = req.body;
      const currentBook = await bookService.getBook(String(bookId));
      if (!currentBook) {
        throw new NotFound('Book not found');
      }
      const rating = await bookService.updateRating(
        String(userId),
        String(bookId),
        Number(value)
      );
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  }

  async getAverageRating(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      const rating = await bookService.getAverageRating(String(id));
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentBookRating(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = req.query.id;
      const userId = req.user.id;
      const rating = await bookService.getCurrentBookRating(
        String(bookId),
        String(userId)
      );
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  }
}

export default new BookController();
