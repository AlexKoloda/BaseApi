import { Router } from 'express';
import cartController from '../controllers/cart-controller';

const cartRouter = Router();

cartRouter.post('/', cartController.addBook);

export default cartRouter;