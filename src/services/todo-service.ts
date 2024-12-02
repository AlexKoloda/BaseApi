import { todoRepository } from '../repository/todo-repository';
import { TodoType, UserInterface } from '../types/types';

class TodoService {
  async createTodo(todo: TodoType) {
    return await todoRepository.save(todo);
  }
  // TODO Сделать фильтрацию
  getFilteredTodo(filter: string, userId: number): Promise<TodoType[]> {
    if (filter === 'all') {
      return this.getUserTodo(userId);
    }

    if (filter === 'active') {
      return this.getUserTodo(userId, false);
    }
  }

  async getUserTodo(userId: number, filter?: boolean) {
    return await todoRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getCurrentTodo(todoId: number) {
    return await todoRepository.findOneBy({ id: todoId });
  }

  async deleteTodo(todoId: number) {
    await todoRepository.delete(todoId);
  }

  async updateTodo(todo: TodoType) {
    await todoRepository.update(todo.id, todo);
  }
}

export default new TodoService();
