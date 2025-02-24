import { Between, In, Like, Not } from 'typeorm';
import { bookRepository } from '../repository/book-repository';
import { genreRepository } from '../repository/genre-repository';
import { BookType } from '../types/types';
import { ratingRepository } from '../repository/rating-repository';
import userService from './user-service';

class BookService {
  createBook(book: BookType) {
    return bookRepository.save(book);
  }

  async getBook(id) {
    const book = await bookRepository.findOne({
      relations: {
        author: true,
        bookGenres: {
          genre: true,
        },
        comments: {
          user: true,
        },
      },
      where: {
        id: id,
      },
    });
    if (book && book.comments) {
      book.comments.sort(
        (a, b) =>
          new Date(a.dateOfCreate).getDate() -
          new Date(b.dateOfCreate).getDate()
      );
    }
    return book;
  }

  async getRecBooks(genreId: string, bookId: string) {
    const books = await bookRepository.find({
      relations: {
        author: true,
        rating: true,
      },
      where: {
        id: Not(bookId),
        bookGenres: {
          genre: {
            id: genreId,
          },
        },
        author: true,
      },

      take: 4,
      cache: true,
    });

    return {
      books: books,
    };
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
        sortingArg = 'rating';
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

    const books = await bookRepository.find({
      relations: {
        author: true,
        rating: true,
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

    const allBook = await bookRepository.findAndCount ({
      skip: from,
      take: limit,
    })

    const pagination = { 
      hasPrevPage: Boolean(page - 1),
      hasNextPage: Boolean(limit <= allBook[1] - from),
      totalPage: Math.ceil(allBook[1]/12),
    };

    if (search) {
      const searchBooks = await bookRepository.find({
        relations: {
          author: true,
          rating: true,
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
        pagination: pagination,
      };
    }
    
    return {
      books: books,
      genres: genres,
      pagination: pagination,
    };
  }

  async updateRating(userId: string, bookId: string, value: number) {
    const user = await userService.getUser(userId);
    const book = await this.getBook(bookId);
    const rating = await ratingRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        book: {
          id: bookId,
        },
      },
    });

    if (!rating) {
      return ratingRepository.save({ book, user, value });
    }
    rating.value = value;
    const res = await ratingRepository.update(rating.id, rating);
    return res;
  }

  async getAverageRating(id: string) {
    let averageRating = 0;
    const rating = await ratingRepository.find({
      where: { book: { id: id } },
    });
    rating.map((item) => {
      averageRating += item.value;
      return averageRating;
    });
    return Math.round(averageRating / rating.length);
  }

  async getCurrentBookRating(bookId: string, userId: string) {
    const rating = await ratingRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        book: {
          id: bookId,
        },
      },
    });
    if (!rating) {
      return 0;
    }
    return rating.value;
  }
}

export default new BookService();

