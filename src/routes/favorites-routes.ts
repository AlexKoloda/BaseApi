import { Router } from 'express';
import favoritesController from '../controllers/favorites-controller';

const favoritesRouter = Router();

favoritesRouter.post('/', favoritesController.addBook)
favoritesRouter.get('/get', favoritesController.getBooks)
favoritesRouter.delete('/', favoritesController.removeBook)



export default favoritesRouter;