import { todoRepository } from "../repository/todo-repository";
import { TodoType } from "../types/types";

class TodoService {
  async createTodo(todo: TodoType, /* userId: number */) {
    return await todoRepository.save(todo);
  }

  async getFilteredTodo(filter: string): Promise<TodoType[]> {
    return await todoRepository.find();
  }

  async getCurrentTodo(todoId: number) {
    return await todoRepository.findOneBy({id: todoId})
  }

  async deleteTodo(todoId: number) {
    await todoRepository.delete(todoId);
  }

  async updateTodo(todo: TodoType) {
    await todoRepository.update(todo.id, todo)
  }
}

export default new TodoService();