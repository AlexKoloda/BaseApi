import { favoritesRepository } from '../repository/favorites-repository';
import userService from './user-service';

class FavoritesService {
  async addBook(userId, bookId) {
    return favoritesRepository.save({
      user: userId,
      book: bookId,
    });
  }

  async getBooks(id) {
    const user = await userService.getUser(id);
    return favoritesRepository.find({
      where: {
        user: {
          id: user.id
        },
      },
      relations: {
        book: {
          author: true,
          bookGenres: {
            genre: true,
          },
          rating: true,
        }
      },
      order: {
        dateAdded: 'DESC',
      },
      cache: true,
    });
  }

  async removeBook(bookId, userId) {
    return favoritesRepository.delete({
      user: {
        id: userId,
      },
      book: {
        id: bookId,
      }
    });
  }  
}

export default new FavoritesService();
