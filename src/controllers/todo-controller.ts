import { NextFunction, Request, Response } from "express";
import todoService from "../services/todo-service";

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
      const {filter} = req.params;
      const todos = await todoService.getFilteredTodo(filter);
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const currentTodo = await todoService.getCurrentTodo(Number(id));
      res.status(200).json(currentTodo);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

export default new TodoController();
