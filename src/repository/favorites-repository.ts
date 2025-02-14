import { AppDataSource } from '../db/data-source';
import Favorites from '../db/entities/Favorites';

export const favoritesRepository = AppDataSource.getTreeRepository(Favorites);