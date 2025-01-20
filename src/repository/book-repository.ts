import { AppDataSource } from '../db/data-source';
import { Book } from '../db/entities/Book';

export const bookRepository = AppDataSource.getTreeRepository(Book);
