import { Router } from 'express';
import authRouter from './auth-routes';
import userRouter from './user-routes';
import { authenticateToken } from '../middleware';
import bookRouter from './book-routes';
import cartRouter from './cart-routes';
import ratingRouter from './rating-routes';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/book', bookRouter);
mainRouter.use('/user', authenticateToken, userRouter);
mainRouter.use('/rating',ratingRouter);
mainRouter.use('/cart', authenticateToken, cartRouter);

export default mainRouter;
