// TODO Изменить на логику книг

// import User from '../db/entities/User';
import { Genre } from '../db/entities/Genre';
import { bookRepository} from '../repository/book-repository';
import { genreRepository } from '../repository/genre-repository';
import { BookType } from '../types/types';

class BookService {
  createBook(book: BookType) {
    return bookRepository.save(book);
  }

  async getBooks(page, genre) {
    console.log(genre)
    const limit = 12;
    const from = (Number(page) - 1) * limit;
    
    const genres = await genreRepository.find();
    const books = await bookRepository.findAndCount({   
  
      relations: {
        author: true,

      },       

      where: {
        bookGenres: {
          genre: { id: genre}
        }
      },
      skip: from,
      take: limit,      
    });
   
    return {
      books: books,
      genres: genres,
    }
  }

  //   async getFilteredTodos(todos: TodoType[],filter: string,userId: number): Promise<TodoType[]> {
  //     if (filter === 'all') {
  //       return todos;
  //     }
  //     return await todoRepository.find({
  //       where: {
  //         user: { id: userId },
  //         isCompleted: filter === 'active' ? false : true,
  //       },
  //     });
  //   }

  //   async toggleStatus(userId: number): Promise<TodoType[]> {
  //     const todos = await todoRepository.find({
  //       where: {
  //         user: { id: userId },
  //       },
  //     });
  //     const uncompleted = todos.some((todo) => !todo.isCompleted);
  //     todos.map((todo) => {
  //       todo = { ...todo, isCompleted: uncompleted ? true : false };
  //       todoRepository.save(todo);
  //       return todo;
  //     });
  //     return todos;
  //   }

  //   getCurrentTodo(todoId: number, userId: number) {
  //     return todoRepository.findOne({
  //       where: {
  //         id: todoId,
  //         user: {
  //           id: userId,
  //         },
  //       },
  //     });
  //   }

  //   deleteTodo(todoId: number) {
  //     todoRepository.delete(todoId);
  //   }

  //   async deleteAllTodo(userId: number) {
  //     todoRepository.delete({
  //       user: {
  //         id: userId,
  //       },
  //     });
  //   }

  //   updateTodo(todo: TodoType) {
  //     return todoRepository.update(todo.id, todo);
  //   }
}

export default new BookService();
