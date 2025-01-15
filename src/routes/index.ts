import { Router } from 'express';
import authRouter from './auth-routes';
import userRouter from './user-routes';
import { authenticateToken } from '../middleware';
//import todoRouter from './todo-routes';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', authenticateToken, userRouter);
//mainRouter.use('/todo', authenticateToken, todoRouter);
export default mainRouter;
