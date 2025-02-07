import { Router } from 'express';
import { validate } from '../validation/validate';
import { createBookSchema} from '../validation/book-schemas';
import bookController from '../controllers/book-controller';

const bookRouter = Router();

bookRouter.post('/create', validate(createBookSchema), bookController.createBook);
bookRouter.get('/get', bookController.getBook);
bookRouter.get('/getRec', bookController.getRecommendationBooks);
bookRouter.get('/', bookController.getAllBook);

// todoRouter.get('/toggle', todoController.toggleComplete);
// todoRouter.get('/:id', todoController.getCurrentTodo);
// todoRouter.patch('/', validate(updateTodoSchema), todoController.updateTodo);
// todoRouter.delete('/all', todoController.deleteAllTodo);
// todoRouter.delete('/:id', todoController.deleteTodo);

export default bookRouter;
