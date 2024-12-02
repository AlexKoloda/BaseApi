import { Router } from "express";
import todoController from "../controllers/todo-controller";
import { validate } from "../validation/validate";
import { createTodoSchema, updateTodoSchema } from "../validation/todo-schemas";

const todoRouter = Router();

todoRouter.post("/create", validate(createTodoSchema), todoController.createTodo);
todoRouter.get("/:id", todoController.getCurrentTodo);
todoRouter.get("/filter/:filter", todoController.getFilteredTodos);
todoRouter.patch("/", todoController.updateTodo);
todoRouter.delete("/:id", validate(updateTodoSchema), todoController.deleteTodo);

export default todoRouter;
