import { NextFunction, Request, Response } from "express";
import todoService from "../services/todo-service";
import { NotFound } from "../util/custom-errors";

class TodoController {
  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = req.body;
      const currentUser = req.user;
      todo.user = currentUser;
      await todoService.createTodo(todo);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  async getFilteredTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.params;
      const userId = req.user.id;
      const todos = await todoService.getFilteredTodo(filter, userId);
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const currentTodo = await todoService.getCurrentTodo(Number(id));
      res.status(200).json(currentTodo);
    } catch (err) {
      next(err);
    }
  }
  // TODO Сделать проверку владельца
  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedTodos = await todoService.getCurrentTodo(Number(id));
      if (!deletedTodos) {
        throw new NotFound("Todo not found");
      }
      todoService.deleteTodo(Number(id));
      res.status(200).json("Todo delete");
    } catch (err) {
      next(err);
    }
  }
  // TODO Сделать валидацию и проверку владельца
  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      await todoService.updateTodo(req.body);
      const updateTodo = await todoService.getCurrentTodo(Number(id));
      res.status(200).json(updateTodo);
    } catch (err) {
      next(err);
    }
  }
}

export default new TodoController();
