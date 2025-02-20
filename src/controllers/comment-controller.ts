import { Request, Response, NextFunction } from 'express';
import commentService from '../services/comment-service';

class CommentController {
  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const bookId = req.body.bookId;
      const commentText = req.body.text;
      const data = {
        userId: userId,
        bookId: bookId,
        text: commentText,
      };
      const comment = await commentService.addComment(data);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      const comments = await commentService.getBookComments(id);
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }
}

export default new CommentController();
