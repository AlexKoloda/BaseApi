import { Router } from 'express';
import cartController from '../controllers/cart-controller';
import bookController from '../controllers/book-controller';
import { authenticateToken } from '../middleware';

const ratingRouter = Router();

ratingRouter.patch('/', authenticateToken, bookController.updateBookRating);
ratingRouter.get('/rate', authenticateToken, bookController.getCurrentBookRating);
ratingRouter.get('/get', bookController.getAverageRating);

export default ratingRouter;