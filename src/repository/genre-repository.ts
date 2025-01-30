import { AppDataSource } from '../db/data-source';
import { Genre } from '../db/entities/Genre';

export const genreRepository = AppDataSource.getTreeRepository(Genre);