// TODO Изменить на логику книг

import { ArrayContains, Between, In, Like } from 'typeorm';
import { bookRepository } from '../repository/book-repository';
import { genreRepository } from '../repository/genre-repository';
import { BookType } from '../types/types';
import { bookGenreRepository } from '../repository/book-genre-repository';

class BookService {
  createBook(book: BookType) {
    return bookRepository.save(book);
  }

  async getBook(id: string) {
    return bookRepository.findOne({
      relations: {
        author: true,
        bookGenres: true,
      },
      where: {
        id: id,
      },
    });
  }

  async getRecBooks(genreId) {
    
    const books = await bookRepository.find({
      relations: {
        author: true,
      },

      where: {
        bookGenres: {
          genre : {
            name: genreId
          },
        },
      },
    })
     return books; // возвращает []
  }

  async getBooks(page, genre, sort, price, search) {
    let sortingArg = '1';
    const limit = 12;
    const from = (Number(page) - 1) * limit;
    const genreArray = genre ? genre.split(',') : [];
    const priceArray = price ? price.split(',').map(Number) : [];

    switch (sort) {
      case '1':
        sortingArg = 'price';
        break;
      case '2':
        sortingArg = 'title';
        break;
      case '3':
        sortingArg = 'author';
        break;
      case '4':
        sortingArg = 'Rating';
        break;
      case '5':
        sortingArg = 'dataIssue';
        break;
    }

    const priceFilter = {
      min: 0,
      max: 100,
    };

    if (priceArray.length) {
      priceFilter.min = priceArray[0] || 0;
      priceFilter.max = priceArray[1] || 0;
    }

    const genres = await genreRepository.find({
      order: {
        id: 'ASC',
      },
    });

    const books = await bookRepository.findAndCount({
      relations: {
        author: true,
      },

      where: {
        bookGenres: {
          genre: genre ? In(genreArray) : { id: genre },
        },
        price: Between(priceFilter.min, priceFilter.max),
      },

      order: {
        [sortingArg]: 'DESC',

        author: {
          name: 'ASC',
        },
      },

      skip: from,
      take: limit,
      cache: true,
    });

    if (search) {
      const searchBooks = await bookRepository.findAndCount({
        relations: {
          author: true,
        },
        where: [
          { title: Like(`%${search}%`) },
          {
            author: {
              name: Like(`%${search}%`),
            },
          },
          { description: Like(`%${search}%`) },
        ],

        skip: from,
        take: limit,
        cache: true,
      });

      return {
        books: searchBooks,
        genres: genres,
      };
    }

    return {
      books: books,
      genres: genres,
    };

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
}

export default new BookService();
