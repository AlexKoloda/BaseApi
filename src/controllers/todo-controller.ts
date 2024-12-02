import { NextFunction, Request, Response } from 'express';
import todoService from '../services/todo-service';
import { CustomError, NotFound, UnAuthorized } from '../util/custom-errors';
import { checkValidateUser } from '../util/checkUser';
import { excludeUser } from '../util/excludeFunc';

class TodoController {
  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = req.body;
      const currentUser = req.user;
      todo.user = currentUser;
      await todoService.createTodo(todo);
      delete todo.user;
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  async getFilteredTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.params;
      const userId = req.user.id;
      const todos = await todoService.getAllTodo(filter, userId);
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  }

  async getCurrentTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const currentTodo = await todoService.getCurrentTodo(
        Number(req.params.id)
      );
      if (!currentTodo) {
        throw new NotFound('Todo not found');
      }
      if (!checkValidateUser(req.user.id, currentTodo.user.id)) {
        throw new UnAuthorized('Access error');
      }
      excludeUser(currentTodo);
      res.status(200).json(currentTodo);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedTodos = await todoService.getCurrentTodo(
        Number(req.params.id)
      );
      if (!deletedTodos) {
        throw new NotFound('Todo not found');
      }
      if (!checkValidateUser(req.user.id, deletedTodos.user.id)) {
        throw new UnAuthorized('Access error');
      }
      todoService.deleteTodo(Number(req.params.id));
      res.status(200).json('Todo delete');
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const currentTodo = await todoService.getCurrentTodo(Number(req.body.id));
      if (!currentTodo) {
        throw new NotFound('Todo not found');
      }
      if (!checkValidateUser(req.user.id, currentTodo.user.id)) {
        throw new UnAuthorized('Access error');
      }
      await todoService.updateTodo(req.body);
      const updatedTodo = await todoService.getCurrentTodo(req.body.id);
      excludeUser(updatedTodo);
      res.status(200).json(updatedTodo);
    } catch (err) {
      next(err);
    }
  }
}

export default new TodoController();
