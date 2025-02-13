import { Router } from 'express';
import authRouter from './auth-routes';
import userRouter from './user-routes';
import { authenticateToken } from '../middleware';
import bookRouter from './book-routes';
import cartRouter from './cart-routes';
import ratingRouter from './rating-routes';
import commentRouter from './comment-routes';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/book', bookRouter);
mainRouter.use('/user', authenticateToken, userRouter);
mainRouter.use('/comment', authenticateToken, commentRouter);
mainRouter.use('/cart', authenticateToken, cartRouter);
mainRouter.use('/rating',ratingRouter);

export default mainRouter;
