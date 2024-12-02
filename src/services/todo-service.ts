import { todoRepository } from '../repository/todo-repository';
import { TodoType } from '../types/types';

class TodoService {
  async createTodo(todo: TodoType) {
    return await todoRepository.save(todo);
  }

  async getAllTodo(filter: string, userId: number): Promise<TodoType[]> {
    const todos = await todoRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return this.getFilteredTodos(todos, filter);
  }

  getFilteredTodos(todos: TodoType[], filter: string) {
    return todos.filter((todo) => {
      return todo.isCompleted ? todo.isCompleted : todo.isCompleted;
    });
  }

  async getCurrentTodo(todoId: number) {
    return await todoRepository.findOne({
      where: {
        id: todoId,
      },
      relations: ['user'],
    });
  }

  async deleteTodo(todoId: number) {
    await todoRepository.delete(todoId);
  }

  async updateTodo(todo: TodoType) {
    return await todoRepository.update(todo.id, todo);
  }
}

export default new TodoService();
