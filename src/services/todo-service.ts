import { todoRepository } from '../repository/todo-repository';
import { TodoType } from '../types/types';

class TodoService {
  createTodo(todo: TodoType) {
    return todoRepository.save(todo);
  }

  async getAllTodo(userId: number, filter?: any): Promise<TodoType[]> {
    const todos = await todoRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return this.getFilteredTodos(todos, filter, userId);
  }

  async getFilteredTodos(todos: TodoType[],filter: string,userId: number): Promise<TodoType[]> {
    if (filter === 'all') {
      return todos;
    }
    return await todoRepository.find({
      where: {
        user: { id: userId },
        isCompleted: filter === 'active' ? false : true,
      },
    });
  }

  getCurrentTodo(todoId: number, userId: number) {
    return todoRepository.findOne({
      where: {
        id: todoId,
        user: {
          id: userId,
        },
      },
    });
  }

  deleteTodo(todoId: number) {
    todoRepository.delete(todoId);
  }

  updateTodo(todo: TodoType) {
    return todoRepository.update(todo.id, todo);
  }
}

export default new TodoService();
