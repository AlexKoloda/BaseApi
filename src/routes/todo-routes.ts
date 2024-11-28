import { Router } from "express";
import todoController from "../controllers/todo-controller";

const todoRouter = Router();

todoRouter.get('/:all', todoController.getFilteredTodos);
todoRouter.get('/:id', todoController.getCurrentTodo);
todoRouter.patch('/', todoController.updateTodo);
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;