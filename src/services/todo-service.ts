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

  getFilteredTodos(todos: TodoType[], filter: string): TodoType[] {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.isCompleted);
      case 'completed':
        return todos.filter((todo) => todo.isCompleted);
    }
  }


  async getCurrentTodo(todoId: number, userId: number) {
    return await todoRepository.findOne({
      where: {
        id: todoId,
        user: {
          id: userId,
        }
      },
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
