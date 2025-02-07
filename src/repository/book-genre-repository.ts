import { AppDataSource } from '../db/data-source';
import { BookGenre } from '../db/entities/BookGenre';

export const bookGenreRepository = AppDataSource.getTreeRepository(BookGenre);
