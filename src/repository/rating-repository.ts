import { AppDataSource } from '../db/data-source';
import { Rating } from '../db/entities/Rating';


export const ratingRepository = AppDataSource.getTreeRepository(Rating);