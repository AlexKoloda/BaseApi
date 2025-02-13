import { Router } from 'express';
import cartController from '../controllers/cart-controller';

const cartRouter = Router();

cartRouter.post('/', cartController.addBook);
cartRouter.get('/get', cartController.getBooks);
cartRouter.patch('/delete/', cartController.removeBook)

export default cartRouter;