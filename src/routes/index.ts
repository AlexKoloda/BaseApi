import { Router } from 'express';
import { authenticateToken } from '../middleware';

import authRouter from './auth-routes';
import userRouter from './user-routes';
import bookRouter from './book-routes';
import cartRouter from './cart-routes';
import ratingRouter from './rating-routes';
import commentRouter from './comment-routes';
import favoritesRouter from './favorites-routes';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/book', bookRouter);
mainRouter.use('/rating',ratingRouter);
mainRouter.use('/user', authenticateToken, userRouter);
mainRouter.use('/cart', authenticateToken, cartRouter);
mainRouter.use('/comment', authenticateToken, commentRouter);
mainRouter.use('/favorites', authenticateToken, favoritesRouter);

export default mainRouter;
