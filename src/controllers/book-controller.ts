// TODO Переписать на логику книг

import { NextFunction, query, Request, Response } from 'express';
import bookService from '../services/book-service';
import { NotFound } from '../util/custom-errors';
// import { NotFound } from '../util/custom-errors';
// import { excludeUser } from '../util/excludeFunc';

class BookController {
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const newBook = await bookService.createBook(req.body);
      res.status(200).json(newBook);
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
        search
      );
      res.status(200).json(allBook);
    } catch (err) {
      next(err);
    }
  }

  async getBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      const book = await bookService.getBook(String(id));
      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }

  async getRecommendationBooks(req: Request,res: Response,next: NextFunction) {
    try {
      const { genreId } = req.query;
      const { bookId } = req.query;
      const data = await bookService.getRecBooks(genreId, bookId);
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
      const rating = await bookService.updateRating(String(userId), String(bookId), Number(value));
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  }

  async getAverageRating(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.query;
      const rating = await bookService.getAverageRating(id);
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentBookRating(req: Request, res: Response, next: NextFunction) {
    try {     
      const bookId = req.query.id;
      const userId = req.user.id;
      const rating = await bookService.getCurrentBookRating(Number(bookId), Number(userId));
      res.status(200).json(rating);
    } catch (err) {
      next(err);
    }
  }

  //   async getFilteredTodos(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { filter } = req.query;
  //       const stringFilter = filter as string;
  //       const userId = req.user.id;
  //       const todos = await todoService.getAllTodo(userId, stringFilter);
  //       res.status(200).json(todos);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  //   async toggleComplete(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const userId = req.user.id;
  //       const todos = await todoService.toggleStatus(userId);
  //       res.status(200).json(todos);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  //   async getCurrentTodo(req: Request, res: Response, next: NextFunction) {

  //     try {
  //       const currentTodo = await todoService.getCurrentTodo(
  //         Number(req.params.id),
  //         Number(req.user.id)
  //       );
  //       if (!currentTodo) {
  //         throw new NotFound('Todo not found');
  //       }

  //       res.status(200).json(currentTodo);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  //   async deleteTodo(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const deletedTodos = await todoService.getCurrentTodo(
  //         Number(req.params.id),
  //         Number(req.user.id)
  //       );
  //       if (!deletedTodos) {
  //         throw new NotFound('Todo not found');
  //       }

  //       todoService.deleteTodo(Number(req.params.id));
  //       res.status(200).json('Todo delete');
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  //   async deleteAllTodo(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       todoService.deleteAllTodo(Number(req.user.id));
  //       res.status(200).json('Todo delete');
  //     } catch (err) {
  //       next(err);
  //     }
  //   }

  //   async updateTodo(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const currentTodo = await todoService.getCurrentTodo(
  //         Number(req.body.id),
  //         Number(req.user.id)
  //       );
  //       if (!currentTodo) {
  //         throw new NotFound('Todo not found');
  //       }

  //       await todoService.updateTodo(req.body);
  //       const updatedTodo = await todoService.getCurrentTodo(
  //         Number(req.body.id),
  //         Number(req.user.id)
  //       );

  //       res.status(200).json(updatedTodo);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
}

export default new BookController();
