import { NextFunction, Request, Response } from "express";
import todoService from "../services/todo-service";

class TodoController {

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (err) {
      next(err);
    }
  }

  async getFilteredTodos(req: Request, res: Response, next: NextFunction) {
    const { filter } = req.params;
    try {
      const todos = await todoService.getFilteredTodo(filter);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentTodo(req: Request, res: Response, next: NextFunction) {
    try {
      
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