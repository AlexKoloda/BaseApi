import { todoRepository } from '../repository/todo-repository';
import { TodoType } from '../types/types';

class TodoService {
  createTodo(todo: TodoType) {
    return todoRepository.save(todo);
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
