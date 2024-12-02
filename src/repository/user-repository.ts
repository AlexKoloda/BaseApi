import { AppDataSource } from '../db/data-source';
import User from '../db/entities/User';

export const userRepository = AppDataSource.getRepository(User);
