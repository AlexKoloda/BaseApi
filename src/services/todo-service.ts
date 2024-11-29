import { todoRepository } from "../repository/todo-repository";
import { TodoType, UserInterface } from "../types/types";

class TodoService {
  async createTodo(todo: TodoType) {
    return await todoRepository.save(todo);
  }

  async getFilteredTodo(filter: string): Promise<TodoType[]> {
    if (filter === "all") {
    return await todoRepository.find({

 })
/*     return await todoRepository.findBy( {
      where: {
        id: 1,
        isCompleted: filter === "complete",
      }
  }) */
}
}

  async getCurrentTodo(todoId: number) {
    return await todoRepository.findOneBy({ id: todoId });
  }

  async deleteTodo(todoId: number) {
  await todoRepository.delete(todoId);
  }

  async updateTodo(todo: TodoType) {
  await  todoRepository.update(todo.id, todo);
  }
}

export default new TodoService();
