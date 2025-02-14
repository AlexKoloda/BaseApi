import { Router } from 'express';
import cartController from '../controllers/cart-controller';

const cartRouter = Router();

cartRouter.post('/', cartController.addBook);
cartRouter.get('/get', cartController.getBooks);
cartRouter.delete('/', cartController.removeBook)

export default cartRouter;